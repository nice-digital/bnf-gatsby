export interface Feed {
	/** All about records in the BNF, in a consistent order. */
	about: FeedSimpleRecord[];
	treatmentSummaries: FeedSimpleRecord[];
	guidance: FeedSimpleRecord[];
	drugs: FeedDrug[];
	cautionaryAndAdvisoryLabels: FeedCautionaryAndAdvisoryLabels;
	interactions: FeedInteractions;
}

export interface FeedClassification {
	id: string;
	name: string;
	moreSpecificClassifications?: FeedClassification[];
}

export interface FeedDrug {
	id: string;
	sid: string;
	title: string;

	/** Note: not all 'drugs' have a primary classification, e.g. "St John's wort", "cranberry", "dairy products", "enteral feeds" etc */
	primaryClassification?: FeedClassification;
	secondaryClassifications: FeedClassification[];
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
	/** The ID of the record. */
	id: string;
	/** The title of the section. May contain HTML markup. */
	title: string;
	/** The review date of the record, formatted into a string. */
	reviewDate?: string;
	/** The sections of the record." */
	sections: FeedRecordSection[];
}

/** A section of a simple record. */
export interface FeedRecordSection {
	/** The ID of the section. E.g. `PHP107699` */
	id: string;
	/** The title of the section. May contain HTML markup. */
	title: string;
	/** The review date of the record, formatted into a string. */
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
