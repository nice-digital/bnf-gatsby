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
}

/** A BNF PHP ID in the format `^PHP[0-9]+$` */
export type PHPID = `PHP${number}`;

/** A BNF SID in the format `^_[0-9]{9,12}$` */
export type SID = `_${number}`;

export type BNFID = PHPID | SID;

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
	id: BNFID;
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
	id: `section${BNFID}-${number}`;
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
	/** The name of the preparation, for example, \"Anadin Paracetamol 500mg tablets\". */
	name: string;
}

/** This object contains content that is relevant to a set of medical device preparations. */
export interface FeedClinicalMedicalDeviceInformationGroup {
	/** The device description for the clinical medical device information group. For clinical medical device information groups, the drug class content will always be empty, as will the preparation content. The 'drugContent' will contain the information for the clinical medical device information group. */
	deviceDescription?: FeedSimplePot;
}

/** A single section of simple (unstructured) content for a BNF drug or medical device. A monograph will include content from relevant drug classes (groups of drugs that share the same properties), the drug itself, and specific preparations where the properties differ from those of the generic drug. This record has these three parts of content in the \"drugClassContent\", \"drugContent\" and \"prepContent\" fields respectively. */
export interface FeedSimplePot {
	/** The name/title of the pot. */
	potName: string;
}
