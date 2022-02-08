export interface Feed {
	/** All about records in the BNF, in a consistent order. */
	about: FeedSimpleRecord[];
	treatmentSummaries: FeedSimpleRecord[];
	guidance: FeedSimpleRecord[];
	drugs: FeedDrug[];
	cautionaryAndAdvisoryLabels: FeedCautionaryAndAdvisoryLabels;
	dentalPractitionersFormulary: FeedSimpleRecord;
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
