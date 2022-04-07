import { BnfNode } from "../node-types";

export const metadataSchema = `
	"""
	A simple record that just contains a list of sections.
	For example, treatment summaries, about and guidance records, interactions introduction, etc.
	"""
	type ${BnfNode.Metadata} implements Node @dontInfer {
		"The date and time that the export that produced this output started."
		exportStarted: Date! @dateformat

		"The exporter run-tag of the publication. This is the internal RPS designator for the export that generated this output. This value should be given to RPS if there is a problem with this JSON so that we can correlate the content in our systems."
		runTag: String!
	}
`;
