export interface Feed {
	/** All about records in the BNF, in a consistent order. */
	about: FeedSimpleRecord[];
	drugs: FeedDrug[];
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
