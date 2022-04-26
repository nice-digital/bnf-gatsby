/** All custom GraphQL nodes for BNF are prefixed `Bnf` */
export type BnfNodeType = `Bnf${string}`;

export const BnfNode = {
	AboutSection: "BnfAboutSection",
	BorderlineSubstance: "BnfBorderlineSubstance",
	BorderlineSubstancesIntroduction: "BnfBorderlineSubstancesIntroduction",
	BorderlineSubstancePresentation: "BnfBorderlineSubstancePresentation",
	BorderlineSubstancesTaxonomy: "BnfBorderlineSubstancesTaxonomy",
	CautionaryAndAdvisoryGuidance: "BnfCautionaryAndAdvisoryGuidance",
	CautionaryAndAdvisoryLabel: "BnfCautionaryAndAdvisoryLabel",
	Classification: "BnfClassification",
	ClinicalMedicalDeviceInformationGroup:
		"BnfClinicalMedicalDeviceInformationGroup",
	ConstituentDrugs: "BnfConstituentDrugs",
	DentalPractitionersFormulary: "BnfDentalPractitionersFormulary",
	Drug: "BnfDrug",
	Guidance: "BnfGuidance",
	IndicationsAndDose: "BnfIndicationsAndDose",
	IndicationsAndDoseContent: "BnfIndicationsAndDoseContent",
	IndicationAndDoseGroup: "BnfIndicationAndDoseGroup",
	Interactant: "BnfInteractant",
	Interaction: "BnfInteraction",
	InteractionMessage: "BnfInteractionMessage",
	InteractionsIntroduction: "BnfInteractionsIntroduction",
	InteractionsIntroductionSection: "BnfInteractionsIntroductionSection",
	InteractionSupplementaryInformation: "BnfInteractionSupplementaryInformation",
	MedicalDevice: "BnfMedicalDevice",
	MedicalDeviceType: "BnfMedicalDeviceType",
	MedicalDeviceSimplePot: "BnfMedicalDeviceSimplePot",
	MedicinalForm: "BnfMedicinalForm",
	MedicinalFormLabel: "BnfMedicinalFormLabel",
	MedicinalForms: "BnfMedicinalForms",
	MonitoringPot: "BnfMonitoringPot",
	MonitoringPotContent: "BnfMonitoringPotContent",
	NationalFundingDecision: "BnfFundingDecision",
	NationalFundingPot: "BnfNationalFundingPot",
	NationalFundingPotContent: "BnfNationalFundingPotContent",
	NursePrescribersFormularyIntroduction:
		"BnfNursePrescribersFormularyIntroduction",
	NursePrescribersFormularyTreatmentSummary:
		"BnfNursePrescribersFormularyTreatmentSummary",
	Pack: "BnfPack",
	PatientGroup: "BnfPatientGroup",
	Prep: "BnfPrep",
	RecordSection: "BnfRecordSection",
	RouteAndPatientGroups: "BnfRouteAndPatientGroups",
	SimpleRecord: "BnfSimpleRecord",
	SimplePot: "BnfSimplePot",
	SimplePotContent: "BnfSimplePotContent",
	TherapeuticIndication: "BnfTherapeuticIndication",
	TreatmentSummary: "BnfTreatmentSummary",
	WoundManagementIntroduction: "BnfWoundManagementIntroduction",
	WoundManagementProductGroup: "BnfWoundManagementProductGroup",
	WoundManagementTaxonomy: "BnfWoundManagementTaxonomy",
} as const;

export type BnfNodeTypes = typeof BnfNode[keyof typeof BnfNode];
