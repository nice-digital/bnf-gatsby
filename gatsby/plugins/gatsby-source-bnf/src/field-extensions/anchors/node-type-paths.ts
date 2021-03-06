import { type ReadonlyDeep } from "type-fest";

import { BnfNode, type BnfNodeTypes } from "../../node-types";

const map = new Map<BnfNodeTypes, string>([
	[BnfNode.AboutSection, "/about"],
	[BnfNode.CautionaryAndAdvisoryGuidance, "/about"],
	[BnfNode.DentalPractitionersFormulary, "/dental-practitioners-formulary"],
	[BnfNode.Drug, "/drugs"],
	[BnfNode.Guidance, "/medicines-guidance"],
	[BnfNode.MedicalDevice, "/medical-devices"],
	[
		BnfNode.NursePrescribersFormularyIntroduction,
		"/nurse-prescribers-formulary",
	],
	[BnfNode.TreatmentSummary, "/treatment-summaries"],
	[BnfNode.WoundManagementIntroduction, "/wound-management"],
	[BnfNode.WoundManagementTaxonomy, "/wound-management"],
]);

/**
 * A mapping of BNF node type to root URL path segment
 */
export const nodeTypePathMap = map as ReadonlyDeep<Map<string, string>>;
