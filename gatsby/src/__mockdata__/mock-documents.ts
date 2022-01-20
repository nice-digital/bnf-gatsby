import { type Document } from "@nice-digital/search-client";

type SearchResultDocument = Pick<
	Document,
	| "id"
	| "altSourceNames"
	| "contentId"
	| "lessSuitableForPrescribing"
	| "pathAndQuery"
	| "resourceType"
	| "sourceName"
	| "sourceUrl"
	| "teaser"
	| "titleParts"
	| "url"
	| "title"
>;

const searchResult1: SearchResultDocument = {
	id: "2356125",
	altSourceNames: ["BNFWM"],
	contentId: "http://beta-bnf.nice.org.uk/testcontentid/test.html",
	lessSuitableForPrescribing: false,
	pathAndQuery: "/testpathandquery/test.html",
	resourceType: [],
	sourceName: "BNF Wound Management BNF",
	sourceUrl: "http://beta-bnf.nice.org.uk/testsourceurl/test.html",
	teaser:
		"Non-extensible <mark>bandages</mark> Light-weight conforming <mark>bandages</mark> Tubular <mark>bandages</mark> and garments Support...",
	title: "Test title",
	titleParts: ["Test title parts"],
	url: "http://beta-bnf.nice.org.uk/testurl/test.html",
};

export const mockDocuments: Document[] = [searchResult1 as Document];
