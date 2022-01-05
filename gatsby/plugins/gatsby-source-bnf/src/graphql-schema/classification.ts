export const classificationSchema = `
	"""
	A classifications for a drug, as a small taxonomy, represented as a tree data structure.
	"""
	type BnfClassification implements Node @dontInfer {
		"The feed ID of the classification e.g. '_448101428'"
		bnfId: String!

		"The name of the classification e.g 'Vitamins and trace elements'"
		name: String!

		"The more specific classifications where available. For example, 'HIV-integrase inhibitors' is a more specific classification of 'antivirals'. Not all classifications have a more specific one, for example 'Enzymes' for the drug 'velaglucerase alfa'"
		moreSpecificClassifications: [BnfClassification!] @link

		"The parent classification(s), if any. E.g. 'Monoclonal antibodies' (_805434570) is in both 'Immunosuppressants' (_224050719) and 'Antineoplastic drugs' (_633107392)"
		moreGeneralClassification: [BnfClassification!] @link

		"The drugs for which this is a primary classification"
		primaryDrugs: [BnfDrug!]! @link

		"The drugs for which this is a secondary classification"
		secondaryDrugs: [BnfDrug!]! @link
	}
`;
