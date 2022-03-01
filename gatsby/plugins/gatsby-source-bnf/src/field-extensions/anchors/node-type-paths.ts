import { type ReadonlyDeep } from "type-fest";

import { BnfNode, type BnfNodeTypes } from "../../node-types";

const map = new Map<BnfNodeTypes, string>();

map.set(BnfNode.Drug, "/drugs");
map.set(BnfNode.AboutSection, "/about");
map.set(BnfNode.CautionaryAndAdvisoryGuidance, "/about");
map.set(BnfNode.TreatmentSummary, "/treatment-summaries");
map.set(BnfNode.Guidance, "/medicines-guidance");
map.set(BnfNode.MedicalDevice, "/medical-devices");
map.set(BnfNode.WoundManagementIntroduction, "");

// TODO: Handle taxonomy links properly when we know the URL structure
map.set(
	BnfNode.WoundManagementTaxonomy,
	"/wound-management-products-and-elasticated-garments"
);

/**
 * A mapping of BNF node type to root URL path segment
 */
export const nodeTypePathMap = map as ReadonlyDeep<Map<string, string>>;