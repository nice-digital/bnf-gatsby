import { CreateSchemaCustomizationArgs, CreateWebpackConfigArgs } from "gatsby";

import { initialFieldExtension } from "./src/field-extensions/initial";

/**
 * Gatsby hook for customizing the schema.
 * See https://www.gatsbyjs.org/docs/schema-customization/
 */
export const createSchemaCustomization = ({
	actions: { createFieldExtension, createTypes },
}: CreateSchemaCustomizationArgs): void => {
	createFieldExtension(initialFieldExtension);

	// Add initials for types used in A-Z lists, as it's easier for grouping
	// We don't add the initial field in the source plugin because grouping is a presentation concern
	const typeDefs = `
	  type BnfDrug implements Node {
		"The lowercase first letter of the title, used for grouping"
		initial: String! @initial(field: "title")
	  }
	  type BnfTreatmentSummary implements Node {
		"The lowercase first letter of the title, used for grouping"
		initial: String! @initial(field: "title")
	  }
	  type BnfInteractant implements Node {
		"The lowercase first letter of the title, used for grouping"
		initial: String! @initial(field: "title")
	  }
	`;
	createTypes(typeDefs);
};

/**
 * Gatsby hook for overriding webpack config
 * See https://www.gatsbyjs.com/docs/how-to/custom-configuration/add-custom-webpack-config/
 */
export const onCreateWebpackConfig = ({
	stage,
	actions,
	getConfig,
	plugins,
}: CreateWebpackConfigArgs): void => {
	// Disable order warnings from mini CSS plugin
	// See https://github.com/gatsbyjs/gatsby/discussions/30169#discussioncomment-621285
	if (stage === "build-javascript" || stage === "develop") {
		const config = getConfig();

		const miniCss = config.plugins.find(
			(plugin: () => void) => plugin.constructor.name === "MiniCssExtractPlugin"
		);

		if (miniCss) {
			miniCss.options.ignoreOrder = true;
		}

		actions.replaceWebpackConfig(config);

		actions.setWebpackConfig({
			plugins: [plugins.provide({ process: "process/browser" })],
		});
	}
};
