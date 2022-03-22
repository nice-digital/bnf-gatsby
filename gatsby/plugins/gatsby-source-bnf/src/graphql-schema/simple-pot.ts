import { BnfNode } from "../node-types";

export const simplePotSchema = `
	"""
	A single section of simple (unstructured) content for a BNF drug or medical device. A monograph will include content from relevant drug classes (groups of drugs that share the same properties), the drug itself, and specific preparations where the properties differ from those of the generic drug. This record has these three parts of content in the drugClassContent, drugContent and prepContent fields respectively.
	"""
	type ${BnfNode.SimplePot} {
		"The name/title of the pot."
		potName: String!

		"The slugified and lowercased pot name, used as an ID/hash link"
		slug: String! @slug(field: "potName")

		"The simple pot content that relates to relevant drug classes for the drug. This field will contain more than one entry when the drug belongs to multiple drug classes with relevant content for the pot."
		drugClassContent: [${BnfNode.SimplePotContent}!]!

		"The simple pot content that relates to the drug."
		drugContent: ${BnfNode.SimplePotContent}

		"Any simple pot content that relates to specific preparations. This field will contain more than one entry when the drug has multiple preparations with specific relevant content for the pot."
		prepContent: [${BnfNode.SimplePotContent}!]!
	}

	"""
	Content for use within a ${BnfNode.SimplePot}
	"""
	type ${BnfNode.SimplePotContent} {
		"What the content is for (the name of a drug class, drug or preparation). May contain HTML mark-up"
		contentFor: String! @html

		"The content. May contain HTML mark-up."
		content: String! @html
	}
`;
