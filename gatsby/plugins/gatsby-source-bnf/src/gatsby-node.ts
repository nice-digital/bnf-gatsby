import {
	SourceNodesArgs,
	CreateSchemaCustomizationArgs,
	CreateResolversArgs,
} from "gatsby";

import { downloadFeed } from "./downloader/downloader";
import { schema } from "./graphql-schema";
import { createDrugNodes } from "./node-creation/drugs";

/**
 * Gatsby hook for customizing the schema.
 * See https://www.gatsbyjs.org/docs/schema-customization/
 */
export const createSchemaCustomization = ({
	actions: { createTypes },
}: CreateSchemaCustomizationArgs): void => createTypes(schema);

/**
 * Gatsby hook for creating nodes from a plugin.
 * See https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/creating-a-source-plugin/#source-data-and-create-nodes
 */
export const sourceNodes = async (
	sourceNodesArgs: SourceNodesArgs
): Promise<undefined> => {
	const {
		reporter: { activityTimer },
	} = sourceNodesArgs;

	const { start, setStatus, end } = activityTimer(
		`Download data and creating BNF nodes`
	);
	start();

	const feedData = await downloadFeed();

	setStatus(`Downloaded feed data`);

	// Create all of our different nodes
	createDrugNodes(feedData.drugs, sourceNodesArgs);

	setStatus(`Created all nodes`);
	end();

	return;
};
