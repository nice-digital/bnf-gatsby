export interface Feed {
	drugs: FeedDrug[];
}

export interface FeedDrug {
	id: string;
	sid: string;
	title: string;
}
