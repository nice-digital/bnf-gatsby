import { BnfNode } from "../node-types";

export const woundManagementSchema = `
	type ${BnfNode.WoundManagementIntroduction} implements Node & ${BnfNode.SimpleRecord} @dontInfer {
		"The title of the section. May contain HTML markup."
		title: String!

		"The review date of the record, formatted into a string."
		reviewDate: Date @dateformat

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"The sections of the record."
		sections: [${BnfNode.RecordSection}!]!
	}

	type ${BnfNode.WoundManagementTaxonomy} implements Node @dontInfer {
		"The title of the taxonomy node. May contain HTML mark-up."
		title: String!

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"The review date of the record."
		reviewDate: Date @dateformat

		"The text of the taxonomy node. May contain HTML mark-up."
		text: String @html

		"The wound management product groups and preparations that are applicable for this point in the wound management taxonomy."
		productGroups: [${BnfNode.WoundManagementProductGroup}!]!

		"Any children records of the wound management taxonomy."
		childTaxonomies: [${BnfNode.WoundManagementTaxonomy}!]! @link

		"The parent taxonomy. Empty for root level taxonomy nodes."
		parentTaxonomy: ${BnfNode.WoundManagementTaxonomy} @link

		"The root taxonomy"
		rootTaxonomy: ${BnfNode.WoundManagementTaxonomy}! @link
	}

	type ${BnfNode.WoundManagementTaxonomyRoot} implements Node @dontInfer {
		"The taxonomy node"
		taxonomy: ${BnfNode.WoundManagementTaxonomy}! @link
	}

	type ${BnfNode.WoundManagementTaxonomyProductGroup} implements Node @dontInfer {
		"The taxonomy node"
		taxonomy: ${BnfNode.WoundManagementTaxonomy}! @link
	}

	"A wound management product group represents a group of wound management products including details of any relevant preparations and prices."
	type ${BnfNode.WoundManagementProductGroup} @dontInfer {
		"The title of the wound management product group."
		title: String!

		"The description of the wound management product group. May contain HTML mark-up."
		description: String @html

		"The list of products in the wound management product group."
		products: [${BnfNode.Prep}!]!
	}
`;
