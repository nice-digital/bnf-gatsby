export interface Feed {
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
