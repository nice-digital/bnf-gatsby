import { BnfNode } from "../node-types";

export const metadataSchema = `
	"""
	The metadata relating to the export that produced the app JSON output. An export is a job that is run to collate all of the published BNF content at a particular point in time (the 'content cut' date).
	"""
	type ${BnfNode.Metadata} implements Node @dontInfer {
		"The date and time that the export that produced this output started."
		exportStarted: Date! @dateformat

		"The exporter run-tag of the publication. This is the internal RPS designator for the export that generated this output. This value should be given to RPS if there is a problem with this JSON so that we can correlate the content in our systems."
		runTag: String!

		"The publication. A value of 'bnf' shows that the JSON contains the British National Formulary content, while a value of 'bnfc' shows that the JSON contains the BNF for Children content."
		publication: String!

		"The output will contain records published in the CMS up to this date and time. The format used is ISO 8601-1:2019 compliant (without a time zone designator), e.g. '2021-07-06T00:37:25.918'."
		contentCut: Date! @dateformat

		"The version of the Dictionary of Medicines and Devices (dm+d) dataset (which contains preparation data) used by the export that produced this output. The value is presented in yyyy.m.w format, e.g. '2021.5.4'."
		dmdVersion: String!

		"The version of the international edition of SNOMED CT used by the export that produced this output."
		snomedInternationalVersion: String!

		"The version of the UK clinical extension of SNOMED CT used by the export that produced this output."
		snomedUKExtensionVersion: String!

		"The version of the UK drug extension of SNOMED CT used by the export that produced this output."
		snomedUKDrugExtensionVersion: String!
	}
`;
