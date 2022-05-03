import {
	CreateSchemaCustomizationArgs,
	CreateWebpackConfigArgs,
	CreatePageArgs,
} from "gatsby";

import { BnfNode } from "./plugins/gatsby-source-bnf/src/node-types";
import { initialFieldExtension } from "./src/field-extensions/initial";
import { isBNFC } from "./src/site";

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

/**
 * Gatsby hook for page creation/deletion
 * See https://www.gatsbyjs.com/docs/creating-and-modifying-pages/
 */
export const onCreatePage = ({
	page,
	actions,
	getNodesByType,
	reporter,
}: CreatePageArgs): void => {
	// Delete wound management from BNFC
	const { deletePage } = actions;
	if (isBNFC && page.path === "/wound-management/") {
		deletePage(page);
	}

	// The Gatsby File System Route API doesn't support queries or returning null from pages,
	// so we have to delete empty pages here, e.g. medical device types that have no preps will have CMPIs instead
	const medicalDeviceSubPageRegex = /^\/medical-devices\/[^/]*\/([^/]+)/;
	if (
		medicalDeviceSubPageRegex.test(page.path) &&
		page.component.includes(
			"{BnfMedicalDeviceType.medicalDevice__slug}/{BnfMedicalDeviceType.slug}.tsx"
		)
	) {
		const medicalDeviceType = getNodesByType(BnfNode.MedicalDeviceType).find(
			(n) => n.id === page.context.id
		);

		if (!medicalDeviceType)
			throw Error(
				`Could not find medical device type node with id ${page.context.id}`
			);

		if (!medicalDeviceType.hasPreps) {
			reporter.info(
				`Deleting page '${medicalDeviceType.title}' because it has no preps`
			);
			deletePage(page);
		}
	}
};
