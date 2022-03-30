import {
	type SourceNodesArgs,
	type CreateSchemaCustomizationArgs,
	type PluginOptionsSchemaArgs,
} from "gatsby";
import { type Schema } from "gatsby-plugin-utils";

import { downloadFeed, type PluginOptions } from "./downloader/downloader";
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

	const { start, setStatus, end, panic } = activityTimer(
		`Download data and creating BNF nodes`
	);
	start();

	let feedData: Feed;
	try {
		feedData = await downloadFeed(options);
		setStatus(`Downloaded feed data`);
	} catch (e) {
		panic(e);
		return;
	}

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

	setStatus(`Created all nodes`);
	end();

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
