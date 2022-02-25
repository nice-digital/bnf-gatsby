import { CreateSchemaCustomizationArgs } from "gatsby";

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
