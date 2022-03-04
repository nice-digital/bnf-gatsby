/** All custom GraphQL nodes for BNF are prefixed `Bnf` */
export type BnfNodeType = `Bnf${string}`;

export const BnfNode = {
	AboutSection: "BnfAboutSection",
	CautionaryAndAdvisoryGuidance: "BnfCautionaryAndAdvisoryGuidance",
	CautionaryAndAdvisoryLabel: "BnfCautionaryAndAdvisoryLabel",
	Classification: "BnfClassification",
	ConstituentDrugs: "BnfConstituentDrugs",
	DentalPractitionersFormulary: "BnfDentalPractitionersFormulary",
	Drug: "BnfDrug",
	Guidance: "BnfGuidance",
	Interactant: "BnfInteractant",
	Interaction: "BnfInteraction",
	InteractionMessage: "BnfInteractionMessage",
	InteractionsIntroduction: "BnfInteractionsIntroduction",
	MedicalDevice: "BnfMedicalDevice",
	TreatmentSummary: "BnfTreatmentSummary",
	RecordSection: "BnfRecordSection",
	SimpleRecord: "BnfSimpleRecord",
	WoundManagementIntroduction: "BnfWoundManagementIntroduction",
	WoundManagementProductGroup: "BnfWoundManagementProductGroup",
	WoundManagementTaxonomy: "BnfWoundManagementTaxonomy",
} as const;

export type BnfNodeTypes = typeof BnfNode[keyof typeof BnfNode];
