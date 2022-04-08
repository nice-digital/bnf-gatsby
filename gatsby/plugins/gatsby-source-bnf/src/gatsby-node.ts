import { createHash } from "crypto";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

import {
	type SourceNodesArgs,
	type CreateSchemaCustomizationArgs,
	type PluginOptionsSchemaArgs,
} from "gatsby";
import { type Schema } from "gatsby-plugin-utils";
import JSZip from "jszip";

import {
	downloadFeed,
	downloadImages,
	type PluginOptions,
} from "./downloader/downloader";
import { type Feed } from "./downloader/types";
import { htmlFieldExtension } from "./field-extensions/html";
import { slugFieldExtension } from "./field-extensions/slug";
import { schema } from "./graphql-schema";
import { createCautionaryAndAdvisoryLabelsNodes } from "./node-creation/cautionary-advisory";
import { createDrugNodes } from "./node-creation/drugs";
import { createInteractionNodes } from "./node-creation/interactions";
import { createMedicalDeviceNodes } from "./node-creation/medical-devices";
import { createNursePrescribersNodes } from "./node-creation/nurse-prescribers-formulary";
import { createSimpleRecordNodes } from "./node-creation/utils";
import { createWoundManagementNodes } from "./node-creation/wound-management";
import { BnfNode } from "./node-types";

/**
 * Gatsby hook for customizing the schema.
 * See https://www.gatsbyjs.org/docs/schema-customization/
 */
export const createSchemaCustomization = ({
	actions: { createFieldExtension, createTypes },
}: CreateSchemaCustomizationArgs): void => {
	createTypes(schema);

	createFieldExtension(slugFieldExtension);
	createFieldExtension(htmlFieldExtension);
};

/** Download the ZIP of images from the feed and extracts it to the public folder.
 *
 * @returns The relative base path for the extracted images.
 */
const getAndExtractImages = async (
	activityTimer: SourceNodesArgs["reporter"]["activityTimer"],
	options: PluginOptions
): Promise<string> => {
	const getImageZipActivity = activityTimer(`Download images zip`);
	getImageZipActivity.start();

	let imageZip: Buffer;
	try {
		imageZip = await downloadImages(options);

		const zipSize = Math.round(Buffer.byteLength(imageZip) / Math.pow(1024, 2));

		getImageZipActivity.setStatus(`Downloaded ${zipSize}MB ZIP file of images`);
		getImageZipActivity.end();
	} catch (e) {
		getImageZipActivity.panic("Error downloading images zip file", e);
		return "";
	}

	const zipHash = createHash("md4").update(imageZip).digest("hex"),
		baseImagesPath = path.join(process.cwd(), "public", "img", zipHash),
		zip = await JSZip().loadAsync(imageZip);

	const extractActivity = activityTimer(`Extract images`);
	extractActivity.start();
	try {
		extractActivity.setStatus(`Making path ${baseImagesPath}`);
		await mkdir(baseImagesPath, { recursive: true });

		const files = Object.keys(zip.files);
		for (const fileName of files) {
			const fileBuffer = await zip.files[fileName].async("nodebuffer"),
				outputPath = path.join(baseImagesPath, fileName);

			extractActivity.setStatus(`Writing ${fileName}`);
			await writeFile(outputPath, fileBuffer, {
				flag: "w",
			});
		}
		extractActivity.setStatus(
			`Extracted ${files.length} files to ${baseImagesPath}`
		);

		extractActivity.end();
	} catch (e) {
		extractActivity.panic("Error extracting zip file of images", e);
		return "";
	}

	// This is the base path of images, served within a img folder that we can use for a long-cache time, but with a hashed path from the ZIP contents.
	// This means getting a new URL when there's a change to the ZIP file contents
	return `/img/${zipHash}/`;
};

/**
 * Gatsby hook for creating nodes from a plugin.
 * See https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/creating-a-source-plugin/#source-data-and-create-nodes
 */
export const sourceNodes = async (
	sourceNodesArgs: SourceNodesArgs,
	options: PluginOptions
): Promise<undefined> => {
	const {
		reporter: { activityTimer },
	} = sourceNodesArgs;

	const imagesBasePath = await getAndExtractImages(activityTimer, options);

	const feedActivity = activityTimer(`Download feed JSON`);
	let feedData: Feed;
	try {
		feedActivity.start();
		feedData = await downloadFeed(options);
		feedActivity.setStatus(`Downloaded feed data`);
		feedActivity.end();
	} catch (e) {
		feedActivity.panic("Error downloading ifeed JSON", e);
		return;
	}

	const createNodesActivity = activityTimer(`Creating custom GraphQL nodes`);
	createNodesActivity.start();

	// Create all of our different nodes
	createDrugNodes(feedData.drugs, sourceNodesArgs);

	// Simple records nodes:
	createSimpleRecordNodes(
		feedData.about,
		BnfNode.AboutSection,
		sourceNodesArgs
	);
	createSimpleRecordNodes(
		feedData.treatmentSummaries,
		BnfNode.TreatmentSummary,
		sourceNodesArgs
	);
	createSimpleRecordNodes(feedData.guidance, BnfNode.Guidance, sourceNodesArgs);
	createSimpleRecordNodes(
		[feedData.dentalPractitionersFormulary],
		BnfNode.DentalPractitionersFormulary,
		sourceNodesArgs
	);

	createCautionaryAndAdvisoryLabelsNodes(
		feedData.cautionaryAndAdvisoryLabels,
		sourceNodesArgs
	);

	createInteractionNodes(feedData.interactions, sourceNodesArgs);

	createMedicalDeviceNodes(feedData.medicalDevices, sourceNodesArgs);

	createNursePrescribersNodes(
		feedData.nursePrescribersFormulary,
		sourceNodesArgs
	);

	// Wound management only exists in BNF and not BNFC
	if (feedData.woundManagement)
		createWoundManagementNodes(feedData.woundManagement, sourceNodesArgs);

	createNodesActivity.setStatus(`Created all nodes`);
	createNodesActivity.end();

	return;
};

/**
 * Gatsby hook for providing a Joi schema for plugin options
 * See https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/configuring-usage-with-plugin-options/#how-to-validate-plugin-options
 * @returns A Joi schema
 */
export const pluginOptionsSchema = ({
	Joi,
}: PluginOptionsSchemaArgs): Schema => {
	return Joi.object({
		feedURL: Joi.string()
			.required()
			.description(
				`The absolute URL of the feed endpoint e.g. https://api.somurl.io/v9/`
			),
		userKey: Joi.string()
			.required()
			.description(`The user/API key for authenticating against the feed`),
		site: Joi.string()
			.valid("bnf", "bnfc")
			.required()
			.description(`The site (bnf/bnfc) we're currently building`),
	}).required();
};
