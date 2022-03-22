export interface Feed {
	/** All about records in the BNF, in a consistent order. */
	about: FeedSimpleRecord[];
	/** All the treatment summaries. A treatment summary provides guidance on
	 * how to deliver a drugs to particular body systems, comparisons between
	 * groups of drugs, or overviews of treatment for common conditions. */
	treatmentSummaries: FeedSimpleRecord[];
	/** All guidance records in the BNF, in a consistent order.
	 * These records would typically (but not exclusively) be found in the front
	 * and back matter of the print editions of the BNF. */
	guidance: FeedSimpleRecord[];
	/** All the drug monograph content.
	 * Each drug monograph contains a number of standard sections (called
	 * `pots`) which describe the various properties of the drug when used in a
	 * clinical context. */
	drugs: FeedDrug[];
	/** The guidance for cautionary and advisory labels and details of each of the labels (Appendix 3). */
	cautionaryAndAdvisoryLabels: FeedCautionaryAndAdvisoryLabels;
	dentalPractitionersFormulary: FeedSimpleRecord;
	/** The interactions introduction, interactants and interactions messages. This field correlates to Appendix 1 of the print editions of the BNF. */
	interactions: FeedInteractions;
	/** All the medical device monograph content. Each medical device monograph contains a number of standard sections (called `pots`) which describe the various properties of the medical device when used in a clinical context. */
	medicalDevices: FeedMedicalDevice[];
	/** The Nurse Prescribers' Formulary (NPF) and associated treatment summaries. */
	nursePrescribersFormulary: FeedNursePrescribersFormulary;
	/** The wound management products and elasticated garments (Appendix 4) content. This will only be present for BNF (and not BNFc). */
	woundManagement?: FeedWoundManagement;
}

/** A BNF PHP ID in the format `^PHP[0-9]+$` */
export type PHPID = `PHP${number}`;

/** A BNF SID in the format `^_[0-9]{9,12}$` */
export type SID = `_${number}`;

/** The ID of a record section e.g. `section_320704649-0` or `sectionPHP107699-0` */
export type SectionID = `section${SID | PHPID}-${number}`;

export interface FeedClassification {
	id: string;
	name: string;
	moreSpecificClassifications?: FeedClassification[];
}

export interface FeedDrug {
	/** The PHP ID for the drug. */
	id: PHPID;
	/** The SID for the drug. */
	sid: SID;
	/** The title for the drug. May include HTML mark-up. */
	title: string;
	/**
	 * The review date, if available for this record.
	 * The format used is ISO 8601-1:2019 compliant (without a time zone designator), e.g. `2021-07-06T00:37:25.918`.
	 */
	reviewDate?: string;
	/** The constituent drugs. This will be populated if the drug is a combination (e.g. 'tramadol with paracetamol') where each constituent exists in the BNF as a monograph in its own right. */
	constituentDrugs?: FeedConstituentDrugs;

	/** Note: not all 'drugs' have a primary classification, e.g. "St John's wort", "cranberry", "dairy products", "enteral feeds" etc */
	primaryClassification?: FeedClassification;
	secondaryClassifications: FeedClassification[];

	/* The allergy and cross-sensitivity section for the drug, including any relevant drug classes and preparations.*/
	allergyAndCrossSensitivity?: FeedSimplePot;
	/** The breast feeding section for the drug, including any relevant drug classes and preparations.*/
	breastFeeding?: FeedSimplePot;
	/** TODO: Will cautions be a string array or object array? */
	cautions?: FeedSimplePot;
	/** The conception and contraception section for the drug, including any relevant drug classes and preparations.*/
	conceptionAndContraception?: FeedSimplePot;
	/** The contra-indications section for the drug, including any relevant drug classes and preparations. */
	contraIndications?: FeedSimplePot;
	/** The drug action section for the drug, including any relevant drug classes and preparations*/
	drugAction?: FeedSimplePot;
	/** The directions for administration section for the drug, including any relevant drug classes and preparations.*/
	directionsForAdministration?: FeedSimplePot;
	/** The effect on laboratory tests section for the drug, including any relevant drug classes and preparations.*/
	effectOnLaboratoryTests?: FeedSimplePot;
	/** The exceptions to legal category section for the drug, including any relevant drug classes and preparations.*/
	exceptionsToLegalCategory?: FeedSimplePot;
	/** The handling and storage section for the drug, including any relevant drug classes and preparations.*/
	handlingAndStorage?: FeedSimplePot;
	/** The hepatic impairment section for the drug, including any relevant drug classes and preparations.*/
	hepaticImpairment?: FeedSimplePot;
	/** The important safety information section for the drug, including any relevant drug classes and preparations. */
	importantSafetyInformation?: FeedSimplePot;
	/** The indications and dose section for the drug, including any relevant drug classes and preparations. */
	indicationsAndDose?: FeedIndicationsAndDosePot;
	/** The less suitable for prescribing section for the drug, including any relevant drug classes and preparations. */
	lessSuitableForPrescribing?: FeedSimplePot;
	/** The medicinal forms for the drug. */
	medicinalForms: FeedMedicinalForms;
	/** The monitoring requirements section for the drug, including any relevant drug classes and preparations. */
	monitoringRequirements?: FeedMonitoringPot;
	/** The national funding section for the drug, including any relevant drug classes and preparations. */
	nationalFunding?: FeedNationalFundingPot;
	/** The palliative care section for the drug, including any relevant drug classes and preparations.*/
	palliativeCare?: FeedSimplePot;
	/** The patient and carer advice section for the drug, including any relevant drug classes and preparations.*/
	patientAndCarerAdvice?: FeedSimplePot;
	/** The pregnancy section for the drug, including any relevant drug classes and preparations.*/
	pregnancy?: FeedSimplePot;
	/** The prescribing and dispensing information section for the drug, including any relevant drug classes and preparations. Note that this section used to contain information about prescribing and dispensing in palliative care, but this will now appear in the palliative care section.*/
	prescribingAndDispensingInformation?: FeedSimplePot;
	/** The pre-treatment screening section for the drug, including any relevant drug classes and preparations.*/
	preTreatmentScreening?: FeedSimplePot;
	/** The profession specific information section for the drug, including any relevant drug classes and preparations.*/
	professionSpecificInformation?: FeedSimplePot;
	/** The renal impairment section for the drug, including any relevant drug classes and preparations.*/
	renalImpairment?: FeedSimplePot;
	/** The side effects section for the drug, including any relevant drug classes and preparations. */
	sideEffects?: FeedSimplePot;
	/** The treatment cessation section for the drug, including any relevant drug classes and preparations.*/
	treatmentCessation?: FeedSimplePot;
	/** The unlicensed use section for the drug, including any relevant drug classes and preparations. */
	unlicensedUse?: FeedSimplePot;
}

/** A wrapper for the constituent drugs of a combination drug. */
export interface FeedConstituentDrugs {
	/** The standard message to be included with the constituent drugs. */
	message: string;
	/** The constituents of the combination drug. */
	constituents: [FeedConstituentDrug, ...FeedConstituentDrug[]];
}

/** A constituent of a combination drug. */
export interface FeedConstituentDrug {
	/** The PHP ID of the constituent drug. */
	id: PHPID;
	/** The SID of the constituent drug. */
	sid: SID;
	/** The title of the constituent drug. May contain HTML mark-up */
	title: string;
}

export interface FeedBaseNamedPot {
	/** The name/title of the pot. */
	potName: string;
}

export interface FeedBasePot<TPotContent extends FeedBasePotContent>
	extends FeedBaseNamedPot {
	/** The pot content that relates to relevant drug classes for the drug. This field will contain more than one entry when the drug belongs to multiple drug classes with relevant content for the pot. */
	drugClassContent?: TPotContent[];
	/** The pot content that relates to the drug. */
	drugContent?: TPotContent;
	/** Any pot content that relates to specific preparations. This field will contain more than one entry when the drug has multiple preparations with specific relevant content for the pot. */
	prepContent?: TPotContent[];
}

export interface FeedBasePotContent {
	/** What the content is for (the name of a drug class, drug or preparation). May contain HTML mark-up */
	contentFor: string;
}

/** A single section of simple (unstructured) content for a BNF drug or medical device. A monograph will include content from relevant drug classes (groups of drugs that share the same properties), the drug itself, and specific preparations where the properties differ from those of the generic drug. This record has these three parts of content in the `drugClassContent`, `drugContent` and `prepContent` fields respectively. */
export type FeedIndicationsAndDosePot =
	FeedBasePot<FeedIndicationsAndDosePotContent>;

/** The details of the indications and doses for a drug, drug class or preparation. */
export interface FeedIndicationsAndDosePotContent extends FeedBasePotContent {
	indicationAndDoseGroups?: FeedIndicationAndDoseGroup[];
	/** Dose adjustments due to interactions content. May contain HTML mark-up. */
	doseAdjustments?: string;
	/** Extremes of body weight content. May contain HTML mark-up. */
	extremesOfBodyWeight?: string;
	/** dose equivalence and conversion content. May contain HTML mark-up. */
	doseEquivalence?: string;
	/** Potency content. May contain HTML mark-up. */
	potency?: string;
	/** Pharmacokinetics content. May contain HTML mark-up. */
	pharmacokinetics?: string;
}

/** A grouping of one or more indications and the doses relevant for those indications. */
export interface FeedIndicationAndDoseGroup {
	/** The therapeutic indications. */
	therapeuticIndications: [
		FeedTherapeuticIndication,
		...FeedTherapeuticIndication[]
	];
	/** The routes, indications, patient groups and doses statements. */
	routesAndPatientGroups?: [
		FeedRouteAndPatientGroups,
		...FeedRouteAndPatientGroups[]
	];
}

/** The therapeutic indication, including SNOMED CT coding where available. */
export interface FeedTherapeuticIndication {
	/** If available, the SNOMED CT identifier that encodes the indication. This value is a should be represented as a 64-bit integer, but it is represented as a String in this JSON to avoid any potential problems of 32-bit integer overflows. */
	sctIndication?: `${number}`;
	/** If available, the English preferred name of the SNOMED CT concept that encodes the therapeutic intent of the indication. */
	sctTherapeuticIntent?: string;
	/** The indication. May contain HTML mark-up. For example `Cataract surgery` or `Anterior segment surgery requiring rapid complete miosis` */
	indication: string;
}

/** The route of administration and one or more patient groups with doses for that route. */
export interface FeedRouteAndPatientGroups {
	/** The route of administration. For example `By mouth` or `By mouth using immediate-release medicines, or by intravenous injection, or by intramuscular injection` */
	routeOfAdministration: string;
	/** The patient groups and dose statements for the given route of administration. */
	patientGroups: [FeedPatientGroup, ...FeedPatientGroup[]];
}

/** A dose statement and the patient group that the dose applies to (e.g. `adult` or `child`). */
export interface FeedPatientGroup {
	/** The patient group that the dose applies to which can only be `adult`, `child`, or `neonate`. */
	patientGroup: "adult" | "child" | "neonate";
	/** Details of the patient group that the dose applies to. For example `Adult (body-weight 40 kg and above)` */
	detailedPatientGroup: string;
	/** The dose statement. May contain HTML mark-up. For example `1&nbsp;tablet once daily.` or `(consult product literature).` */
	doseStatement: string;
}

/**
 * The medicinal forms for a drug. A medicinal form is how a drug is made up for a patient to take, such as `tablet`, `capsule`, or `solution for injection`.
 *
 * Each medicinal form will contain details of the available preparations of the drug.
 * In some cases, a drug monograph may appear in the BNF without any preparations and medicinal forms (for example, if the drug only has special-order preparations that the BNF does not list).
 * In this case, the `initialStatement` will indicate that there are no medicines listed. */
export interface FeedMedicinalForms {
	/** The initial statement for the medicinal forms for a drug. This will either be a standard licensing variation statement or a statement to indicate that there are no medicines listed. */
	initialStatement: string;
	/** The BNF does not contain details of special-order preparations, but where these are available, this field contains a statement to say for which forms special-order preparations are available. */
	specialOrderManufacturersStatement?: string;
	/** The medicinal forms. May be empty if there are no licensed medicines listed in the BNF. */
	medicinalForms?: FeedMedicinalForm[];
}

/** The properties for a medicinal form. This contains all the preparations and packs for a specific medicinal form for a drug, as well as information about applicable cautionary and advisory labels, excipients and electrolytes. */
export interface FeedMedicinalForm {
	/** The name of the medicinal form. */
	form: string;
	/** A list of any cautionary and advisory labels for the medicinal form. */
	cautionaryAndAdvisoryLabels?: string[]; // TODO: Hoping this changes from as string array to an array of objects to include welsh translation and label number
	/** A list of any excipients for the medicinal form, provided as a text statement. */
	excipients?: string;
	/** A list of any electrolytes for the medicinal form, provided as a text statement. */
	electolytes?: string;
	/** The preparations of the drug for the medicinal form. */
	preps: FeedPrep[];
}

/** A single section of simple (unstructured) content for a BNF drug or medical device. A monograph will include content from relevant drug classes (groups of drugs that share the same properties), the drug itself, and specific preparations where the properties differ from those of the generic drug. This record has these three parts of content in the `drugClassContent`, `drugContent` and `prepContent` fields respectively. */
export type FeedSimplePot = FeedBasePot<FeedFeedSimplePotContent>;

/** The details of the indications and doses for a drug, drug class or preparation. */
export interface FeedFeedSimplePotContent extends FeedBasePotContent {
	/** What the content is for (the name of a drug class, drug or preparation). May contain HTML mark-up */
	contentFor: string;
	/** The content. May contain HTML mark-up. */
	content: string;
}

/** A single section of monitoring requirements content for a BNF drug or medical device. A monograph will include content from relevant drug classes (groups of drugs that share the same properties), the drug itself, and specific preparations where the properties differ from those of the generic drug. This record has these three parts of content in the `drugClassContent`, `drugContent` and `prepContent` fields respectively. */
export type FeedMonitoringPot = FeedBasePot<FeedMonitoringPotContent>;

/** The sections covering monitoring requirements. */
export interface FeedMonitoringPotContent extends FeedBasePotContent {
	/** The therapeutic drug monitoring section. May contain HTML mark-up */
	therapeuticDrugMonitoring?: string;
	/** The monitoring of patient parameters section. May contain HTML mark-up */
	monitoringOfPatientParameters?: string;
	/** The patient monitoring programmes section. May contain HTML mark-up */
	patientMonitoringProgrammes?: string;
}

/** A single section of national funding content for a BNF drug or medical device. A monograph will include content from relevant drug classes (groups of drugs that share the same properties), the drug itself, and specific preparations where the properties differ from those of the generic drug. This record has these three parts of content in the `drugClassContent`, `drugContent` and `prepContent` fields respectively. */
export type FeedNationalFundingPot = FeedBasePot<FeedNationalFundingPotContent>;

/** The relevant decisions from NICE, SMC and AWMSG. */
export interface FeedNationalFundingPotContent extends FeedBasePotContent {
	/** The initial paragraph of text at the start of the national funding pot. May contain HTML mark-up */
	initialText: string;
	/** Title for the NICE funding decisions. */
	niceDecisionsTitle?: string;
	/** The NICE funding decisions. */
	niceDecisions?: FeedFundingDecision[];
	/** Title for the SMC funding decisions. */
	smcDecisionsTitle?: string;
	/** The SMC funding decisions. */
	smcDecisions?: FeedFundingDecision[];
	/** Title for the AWMSG funding decisions. */
	awmsgDecisionsTitle?: string;
	/** The AWMSG funding decisions. */
	awmsgDecisions?: FeedFundingDecision[];
	/** Title for the non-NHS content. */
	nonNhsTitle?: string;
	/** Whether the drug can be accessed through the NHS, based on whether it is approved for national funding. May contain HTML mark-up. */
	nonNhs?: string;
}

/** A specific funding decision. */
export interface FeedFundingDecision {
	/** The funding identifier (e.g. `TA177`) */
	fundingIdentifier: string;
	/** The title of the funding decision, usually including the date that the decision was published. May contain HTML mark-up */
	title?: string;
	/** The URL to the relevant funding body's decision. */
	url: string;
	/** A summary of the decision. */
	approvedForUse:
		| "Not recommended"
		| "Recommended"
		| "Recommended with restrictions";
}

export interface FeedCautionaryAndAdvisoryLabels {
	guidance: FeedSimpleRecord;
	labels: FeedLabel[];
}

/** A cautionary and advisory label */
export interface FeedLabel {
	/** The label number */
	number: number;
	/** A description of the label. May contain HTML mark-up. */
	description: string;
	/** The label recommendation in English. */
	englishRecommendation: string;
	/** The Welsh translation of the label recommendation. */
	welshRecommendation: string;
}

/**
 * A simple record that just contains a list of sections.
 * For example, treatment summaries, about and guidance records, interactions introduction, etc.
 */
export interface FeedSimpleRecord {
	/** The ID of the record. The ID may be used in anchor links in HTML content elsewhere in the JSON. */
	id: SID | PHPID;
	/** The title of the section. May contain HTML markup. */
	title: string;
	/** The review date, if available for this record. The format used is ISO 8601-1:2019 compliant (without a time zone designator), e.g. `2021-07-06T00:37:25.918`. */
	reviewDate?: string;
	/** The sections of the record." */
	sections: FeedRecordSection[];
}

/** A section of a simple record. */
export interface FeedRecordSection {
	/** The ID of the section. The ID may be used in anchor links in HTML content elsewhere in the JSON. The section ID can be used to determine the order of the sections within the parent record. Each ID is of the form `section[parent_id]-[num]` where `[parent_id]` is the ID of the parent record and `[num]` is an integer indicating the ordering of the sections, starting from zero. For example, the ID `sectionPHP101870-0` is the first section within the record with ID `PHP101870`. */
	id: SectionID;
	/** The title of the section. May contain HTML markup. */
	title: string;
	/** The review date of the record if available, formatted into a String. The format used is ISO 8601-1:2019 compliant (without a time zone designator), e.g. `2021-07-06T00:37:25.918`. */
	reviewDate?: string;
	/** The content for the section. May contain HTML markup. */
	content: string;
}

/** A wrapper for the interactions content including the introduction, the set of interactants and the interaction messages. */
export interface FeedInteractions {
	/** The interactions introduction record. */
	introduction: FeedSimpleRecord;
	/** The interactant substances. */
	interactants: FeedInteractant[];
	/** The interactant messages. */
	messages: FeedInteraction[];
}

/**
 * An interactant, which is a substance against which interaction messages are authored. Interactions are generally authored against moieties while some drug monographs are authored against salts (e.g. \"warfarin\" and \"warfarin sodium\". The \"interactions\" pot in Drug will contain links to the relevant interactant(s). Where the interactant is the same substance as the drug monograph, the \"sid\" of Drug and Interactant will be the same.
 */
export interface FeedInteractant {
	/** "The SID of the interactant. Where the interactant represents a drug monograph, the value of this field will match the value of the \"sid\" field of  the relevant Drug. */
	sid: string;
	/** The title of the interactant. May contain HTML mark-up. */
	title: string;
}

/** The set of interactions between two interactants. */
export interface FeedInteraction {
	/** The SID of the first interactant. The SID can be found in the \"interactants\" field of Interactions and, where the interactant represents a drug monograph, the \"sid\" field of Drug. */
	interactant1: string;
	/** The SID of the second interactant. The SID can be found in the \"interactants\" field of Interactions and, where the interactant represents a drug monograph, the \"sid\" field of Drug. */
	interactant2: string;
	/** The interaction messages for the two given interactants. */
	messages: FeedInteractionMessage[];
}

export type FeedInteractionSeverity =
	| "Severe"
	| "Moderate"
	| "Mild"
	| "Normal"
	| "Unknown";

/**
 * The ordering based on severity so that severe messages can appear first
 * without relying on the value of `severity`.
 *
 * `Severe` = `4`; `Moderate` = `3`; `Mild` = `2`; `Normal` = `1`; `Unknown` = `0`. */
export type FeedInteractionSeverityOrder = 0 | 1 | 2 | 3 | 4;

/**
 * The evidence for an interaction.
 *
 * This will only be present for messages that are not describing additive effects (i.e. `additiveEffect` is `false`).
 *
 * Can only be `Study`, `Anecdotal`, or `Theoretical`
 * .
 */
export type FeedInteractionEvidence = "Study" | "Anecdotal" | "Theoretical";

/** An interaction message. Context (the interactants that this message applies to) is provided by this object being given in the `messages` field of `Interaction`. */
export type FeedInteractionMessage = {
	/** The message of the interaction. May contain HTML mark-up. */
	message: string;
	/** The severity of the interaction. */
	severity: FeedInteractionSeverity;
	/** The ordering based on severity so that severe messages can appear first without relying on the value of \"severity\". Severe = 4; Moderate = 3; Mild = 2; Normal = 1; Unknown = 0. */
	severityOrder: FeedInteractionSeverityOrder;
	/** Whether the interaction is an additive effect (true) or not (false). */
	additiveEffect: boolean;
} & (
	| {
			/** The evidence for the interaction. This will only bepresent for messages that are not describing additive effects (i.e. \"additiveEffect\" is false). Can only be \"Study\", \"Anecdotal\", or \"Theoretical\". */
			evidence: FeedInteractionEvidence;
			additiveEffect: false;
	  }
	| {
			additiveEffect: true;
	  }
);

/** All the properties for a single medical device monograph. */
export interface FeedMedicalDevice {
	/** The PHP ID for the medical device. */
	id: PHPID;
	/** The SID for the medical device. */
	sid: SID;
	/** The title for the medical device. May include HTML mark-up. */
	title: string;
	/** The medical device types. Usually there is only one of these, but theoretically there could be more. */
	medicalDeviceTypes: [FeedMedicalDeviceType, ...FeedMedicalDeviceType[]];
}

/** An individual medical device. Preparations can appear at this level but they can also appear at the clinical medical device information group level. */
export interface FeedMedicalDeviceType {
	/** The PHP ID for the medical device type. */
	id: PHPID;
	/** The title for the medical device type. May include HTML mark-up. */
	title: string;
	/** The general preparations for the medical device type. This will only be present if there are no clinical medical device information groups. */
	preparations?: FeedPrep[];
	/** The clinical medical device information groups. These contain preparation-specific content such as device descriptions, compliance standards and prescribing & dispensing information. */
	clinicalMedicalDeviceInformationGroups?: FeedClinicalMedicalDeviceInformationGroup[];
}

/** The properties for a preparation. Context is provided by this object being given in the `preps` field of `MedicinalForm` or a `MedicalDeviceType`. */
export interface FeedPrep {
	/** The name of the preparation, for example, `Anadin Paracetamol 500mg tablets`. */
	name: string;
	/** The manufacturer/supplier of the preparation, for example, `GlaxoSmithKline Consumer Healthcare UK Ltd`. */
	manufacturer: string;
	/** The dm+d AMP ID for this preparation. This value is a SNOMED CT identifier, which should be represented as a 64-bit integer, but it is represented as a String in this JSON to avoid any potential problems of 32-bit integer overflows. */
	ampId: `${number}`;
	/** A flag to indicate whether (true) or not (false) this preparation is subject to additional monitoring as required by the European Medicines Agency (EMA). If this flag is true, then an inverted black triangle symbol should be shown (Unicode character U+25BC: ▼). */
	blackTriangle: boolean;
	/** The controlled drug category for the preparation. If this value is not given then the preparation has no controlled drug status. */
	controlledDrugSchedule?:
		| "Schedule 1 (CD Lic)"
		| "Schedule 2 (CD)"
		| "Schedule 2 (CD Exempt Safe Custody)"
		| "Schedule 3 (CD No Register)"
		| "Schedule 3 (CD No Register Exempt Safe Custody)"
		| "Schedule 3 (CD No Register Phenobarbital)"
		| "Schedule 3 (CD No Register Temazepam)"
		| "Schedule 4 (CD Anab)"
		| "Schedule 4 (CD Benz)"
		| "Schedule 5 (CD Inv)";
	/** A marker to indicate whether the preparation is sugar-free or not. This field will not be populated for borderline substance and wound management preparations. */
	sugarFree?: boolean;
	/** A list of the active ingredients for the preparation. */
	activeIngredients?: string[];
	/** A list of the packs for the preparation. For a borderline substance preparation, the packs are sorted by the \"size\" field of the pack as a double-precision floating point number, in ascending order. */
	packs?: FeedPack[];
}

/** The properties for a specific pack of a preparation. Context is provided by this object being given in the `packs` field of `Prep`. */
export interface FeedPack {
	/** The dm+d AMPP ID for this pack, if available. This value is a SNOMED CT identifier, which should be represented as a 64-bit integer, but it is represented as a String in this JSON to avoid any potential problems of 32-bit integer overflows. */
	amppId?: `${number}`;
	/** The quantity/size of the pack. The units for this quantity are given in the `units` field. Will always be present except for wound management preparations. */
	size?: string;
	/** The units of the quantity/size in the `size` field. Will always be present except for wound management preparations. */
	unit?: string;
	/** The NHS indicative price, if available, for example, `£377.00` or `£225,513.09`. For wound management preparations, this field may contain the drug tariff price if no NHS indicative price exists. */
	nhsIndicativePrice?: string;
	/** The legal category, if available. Will not be present for wound management preparations. Can only be `POM`, `P`, `GSL`, or `Not Applicable`. */
	legalCategory?: "POM" | "P" | "GSL" | "Not Applicable";
	/** A flag to indicate whether (`true`) or not (`false`) this pack is only available through hospital ordering. Will not be present for wound management preparations. */
	hospitalOnly?: boolean;
	/** The drug tariff payment category, if available, for example, `Part VIIIA Category A`. */
	drugTariff?:
		| "Part VIIIA Category A"
		| "Part VIII Category B"
		| "Part VIIIA Category C"
		| "Part VIII Category E"
		| "Part IXa"
		| "Part IXb"
		| "Part IXc"
		| "Part IXr"
		| "Part X"
		| "Parts IXb & IXc"
		| "Part VIIIA Category M"
		| "Part VIIIB"
		| "Part VIIIC";
	/** The drug tariff price, if available, for example, `£2.94` or `£2,181.53`. For wound management preparations, the drug tariff price may appear in the 'nhsIndicativePrice' field in the case where there is no NHS indicative price available. */
	drugTariffPrice?: string;
	/** The colour of the preparation, if available. This will only ever be present for wound management preparations. */
	colour?: string;
}

/** This object contains content that is relevant to a set of medical device preparations. */
export interface FeedClinicalMedicalDeviceInformationGroup {
	/** The device description for the clinical medical device information group. For clinical medical device information groups, the drug class content will always be empty, as will the preparation content. The 'drugContent' will contain the information for the clinical medical device information group. */
	deviceDescription?: FeedSimplePot;
}

/** The wound management products and elasticated garments (Appendix 4) content in the BNF. The content is presented as a taxonomy which uses a tree structure, alongside the introductory content. */
export interface FeedWoundManagement {
	/** The wound management introduction. */
	introduction: FeedSimpleRecord;
	/** The taxonomy of wound management products, presented as a tree structure. */
	taxonomy: [FeedWoundManagementTaxonomy, ...FeedWoundManagementTaxonomy[]];
}

/** The wound management products and elasticated garments taxonomy, presented as a tree structure. */
export interface FeedWoundManagementTaxonomy {
	/** The ID of the taxonomy node. */
	id: SID;
	/** The title of the taxonomy node. May contain HTML mark-up. */
	title: string;
	/** The review date of the record, formatted into a string. The format used is ISO 8601-1:2019 compliant (without a time zone designator), e.g. `2021-07-06T00:37:25.918`. */
	reviewDate?: string;
	/** The wound management product groups and preparations that are applicable for this point in the wound management taxonomy. */
	productGroups?: WoundManagementProductGroup[];
	/** Any children records of the wound management taxonomy. */
	children?: FeedWoundManagementTaxonomy[];
}

/** A wound management product group represents a group of wound management products including details of any relevant preparations and prices. */
export interface WoundManagementProductGroup {
	/** The title of the wound management product group. */
	title: string;
	/** The description of the wound management product group. May contain HTML mark-up. */
	description?: string;
	/** The list of products in the wound management product group. */
	products?: FeedPrep[];
}

/** The Nurse Prescribers' Formulary and associated treatment summaries. */
export interface FeedNursePrescribersFormulary {
	/** The Nurse Prescribers' Formulary introduction. */
	introduction: FeedSimpleRecord;
	/** The Nurse Prescribers' Formulary treatment summaries. */
	npfTreatmentSummaries: [FeedSimpleRecord, ...FeedSimpleRecord[]];
}
