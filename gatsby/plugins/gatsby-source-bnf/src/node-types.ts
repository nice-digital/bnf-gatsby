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
	FundingDecision: "BnfFundingDecision",
	Guidance: "BnfGuidance",
	Interactant: "BnfInteractant",
	MedicalDevice: "BnfMedicalDevice",
	MedicinalForm: "BnfMedicinalForm",
	MedicinalForms: "BnfMedicinalForms",
	MonitoringPot: "BnfMonitoringPot",
	MonitoringPotContent: "BnfMonitoringPotContent",
	NationalFundingPot: "BnfNationalFundingPot",
	NationalFundingPotContent: "BnfNationalFundingPotContent",
	TreatmentSummary: "BnfTreatmentSummary",
	Pack: "BnfPack",
	Prep: "BnfPrep",
	RecordSection: "BnfRecordSection",
	SimpleRecord: "BnfSimpleRecord",
	SimplePot: "BnfSimplePot",
	SimplePotContent: "BnfSimplePotContent",
	WoundManagementIntroduction: "BnfWoundManagementIntroduction",
	WoundManagementProductGroup: "BnfWoundManagementProductGroup",
	WoundManagementTaxonomy: "BnfWoundManagementTaxonomy",
} as const;

export type BnfNodeTypes = typeof BnfNode[keyof typeof BnfNode];
