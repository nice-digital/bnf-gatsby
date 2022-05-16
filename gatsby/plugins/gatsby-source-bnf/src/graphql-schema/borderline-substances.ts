import { BnfNode } from "../node-types";

export const borderlineSubstancesSchema = `
	"""
	The borderline substances introduction record.
	"""
	type ${BnfNode.BorderlineSubstancesIntroduction} implements Node & ${BnfNode.SimpleRecord} @dontInfer {
		"The title of the section. May contain HTML markup."
		title: String!

		"The review date of the record, formatted into a string."
		reviewDate: Date @dateformat

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"The sections of the record."
		sections: [${BnfNode.RecordSection}!]!
	}

	"""
	The borderline substance taxonomy as a tree structure.
	"""
	type ${BnfNode.BorderlineSubstancesTaxonomy} implements Node @dontInfer {
		"The title of the taxonomy node. May contain HTML mark-up."
		title: String!

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"The review date of the record, formatted into a string."
		reviewDate: Date @dateformat

		"The borderline substances that are applicable for this point in the borderline substances taxonomy."
		substances: [${BnfNode.BorderlineSubstance}!]!

		"Any children records of the borderline substances taxonomy."
		childTaxonomies: [${BnfNode.BorderlineSubstancesTaxonomy}!]! @link

		"The parent taxonomy. Will be null for root taxonomies."
		parentTaxonomy: ${BnfNode.BorderlineSubstancesTaxonomy} @link

		"The root taxonomy"
		rootTaxonomy: ${BnfNode.BorderlineSubstancesTaxonomy}! @link
	}

	"""
	The root of the borderline substances tree, e.g. 'Foods for special diets' etc
	"""
	type ${BnfNode.BorderlineSubstancesTaxonomyRoot} implements Node @dontInfer {
		taxonomy: ${BnfNode.BorderlineSubstancesTaxonomy}! @link
	}

	"""
	A group of products - the level at which we create sub-pages
	"""
	type ${BnfNode.BorderlineSubstancesTaxonomyProductGroup} implements Node @dontInfer {
		taxonomy: ${BnfNode.BorderlineSubstancesTaxonomy}! @link
	}

	"""
	An individual borderline substance. This comprises a number of presentations, each of which may contain zero or more preparations.
	"""
	type ${BnfNode.BorderlineSubstance} @dontInfer {
		"The PHPID of the borderline substance"
		id: ID!

		"The title of the borderline substance. May contain HTML mark-up."
		title: String!

		"The slugified and lowercased title, used as a URL path/hash"
		slug: String! @slug(field: "title")

		"An optional introductory note for the borderline substance. May contain HTML mark-up."
		introductionNote: String

		"The presentation details for the borderline substance."
		presentations: [${BnfNode.BorderlineSubstancePresentation}!]!
	}

	"""
	The presentation of a borderline substance, i.e. its formulation and nutritional content. Also comprises zero or more preparations.
	"""
	type ${BnfNode.BorderlineSubstancePresentation} @dontInfer {
		"The formulation of the borderline substance, for example 'Liquid (tube feed) per 100 mL'."
		formulation: String

		"The energy content of the borderline substance in kilojoules."
		energyKj: String

		"The energy content of the borderline substance in kilocalories."
		energyKCal: String

		"The protein content of the borderline substance in grams."
		proteinGrams: String

		"The protein constituents of the borderline substance."
		proteinConstituents: [String!]!

		"The carbohydrate content of the borderline substance in grams."
		carbohydrateGrams: String

		"The carbohydrate constituents of the borderline substance."
		carbohydrateConstituents: [String!]!

		"The fat content of the borderline substance in grams."
		fatGrams: String

		"The fat constituents of the borderline substance."
		fatConstituents: [String!]!

		"The fibre content of the borderline substance in grams."
		fibreGrams: String

		"The fibre constituents of the borderline substance."
		fibreConstituents: [String!]!

		"A list of any special characteristics of the borderline substance."
		specialCharacteristics: [String!]!

		"A list of the Advisory Committee on Borderline Substances (ACBS) indications. May contain HTML mark-up."
		acbs: [String!]!

		"The presentation note for the borderline substance."
		presentationNote: String

		"The Rx advice for the borderline substance."
		rxAdvice: String

		"The preparations for the borderline substance."
		borderlineSubstancePreps: [${BnfNode.Prep}!]!
	}
`;
