import { BnfNode } from "../node-types";

export const metadataSchema = `
	"""
	A simple record that just contains a list of sections.
	For example, treatment summaries, about and guidance records, interactions introduction, etc.
	"""
	type ${BnfNode.Metadata} @dontInfer {
		"The date and time that the export that produced this output started. The format used is ISO 8601-1:2019 compliant (without a time zone designator), e.g. "2021-07-06T00:37:25.918"."
		exportStarted: Date @dateformat
	}
`;
