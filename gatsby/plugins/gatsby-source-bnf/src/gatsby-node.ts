import {
	type SourceNodesArgs,
	type CreateSchemaCustomizationArgs,
	type PluginOptionsSchemaArgs,
} from "gatsby";
import { type Schema } from "gatsby-plugin-utils";

import { downloadFeed } from "./downloader/downloader";
import { type Feed } from "./downloader/types";
import { htmlFieldExtension } from "./field-extensions/html";
import { slugFieldExtension } from "./field-extensions/slug";
import { schema } from "./graphql-schema";
import { createCautionaryAndAdvisoryLabelsNodes } from "./node-creation/cautionary-advisory";
import { createDrugNodes } from "./node-creation/drugs";
import { createSimpleRecordNodes } from "./node-creation/utils";
import { BnfNode } from "./node-types";

interface PluginOptions {
	/** The API base URL */
	feedURL: string;
}

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
	{ feedURL }: PluginOptions
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
		feedData = await downloadFeed(feedURL);
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

	createCautionaryAndAdvisoryLabelsNodes(
		feedData.cautionaryAndAdvisoryLabels,
		sourceNodesArgs
	);

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
			.description(`The absolute URL of the feed endpoint`),
	});
};
