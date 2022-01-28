import { type Document } from "@nice-digital/search-client";

type SearchResultDocument = Pick<
	Document,
	"id" | "lessSuitableForPrescribing" | "pathAndQuery" | "teaser" | "title"
>;

const searchResult1: SearchResultDocument = {
	id: "2356125",
	lessSuitableForPrescribing: false,
	pathAndQuery: "/testpathandquery/test.html",
	teaser:
		"Non-extensible <mark>bandages</mark> Light-weight conforming <mark>bandages</mark> Tubular <mark>bandages</mark> and garments Support...",
	title: "Test title",
};

const searchResult2: SearchResultDocument = {
	id: "98765",
	lessSuitableForPrescribing: false,
	pathAndQuery: "/testpathandquery/test.html",
	teaser: "A teaser for the second mock search result",
	title: "Medical devices",
};

export const mockDocuments: Document[] = [
	searchResult1 as Document,
	searchResult2 as Document,
];
