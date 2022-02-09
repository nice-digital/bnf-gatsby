/** All custom GraphQL nodes for BNF are prefixed `Bnf` */
export type BnfNodeType = `Bnf${string}`;

export const BnfNode = {
	AboutSection: "BnfAboutSection",
	CautionaryAndAdvisoryGuidance: "BnfCautionaryAndAdvisoryGuidance",
	CautionaryAndAdvisoryLabel: "BnfCautionaryAndAdvisoryLabel",
	Classification: "BnfClassification",
	DentalPractitionersFormulary: "BnfDentalPractitionersFormulary",
	Drug: "BnfDrug",
	Guidance: "BnfGuidance",
	Interactant: "BnfInteractant",
	TreatmentSummary: "BnfTreatmentSummary",
	RecordSection: "BnfRecordSection",
	SimpleRecord: "BnfSimpleRecord",
} as const;

export type BnfNodeTypes = typeof BnfNode[keyof typeof BnfNode];
