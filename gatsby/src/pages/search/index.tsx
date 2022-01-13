import { resourceLimits } from "worker_threads";

import { useLocation } from "@reach/router";
import { PageProps, Link } from "gatsby";
import { FC, useEffect, useState } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import {
	search,
	initialise,
	type SearchResults,
	type InitialiseOptions,
	SearchResultsSuccess,
} from "@nice-digital/search-client";

import { Announcer } from "@/components/Announcer/Announcer";
import { ErrorPageContent } from "@/components/ErrorPageContent/ErrorPageContent";
import { Layout } from "@/components/Layout/Layout";
import { SearchCardList } from "@/components/SearchCardList/SearchCardList";
import { SearchPagination } from "@/components/SearchPagination/SearchPagination";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import { isBNF } from "../../site";

export type SearchIndexPageProps = PageProps<{ someprop: "somevalue" }>;

initialise({
	baseURL: process.env.GATSBY_SEARCH_URL as InitialiseOptions["baseURL"],
	index: isBNF ? "bnf" : "bnfc",
});

const summaryRecordCount = ({
	firstResult,
	lastResult,
	resultCount,
	finalSearchText,
}: SearchResultsSuccess) => {
	return (
		<>
			Showing {firstResult} to {lastResult} of {resultCount}
			{finalSearchText && (
				<>
					{" "}
					for <strong>{finalSearchText}</strong>
				</>
			)}
		</>
	);
};

const summaryText = (data: SearchResultsSuccess) => {
	const { originalSearch, finalSearchText, resultCount } = data;

	if (resultCount === 0 && !originalSearch) {
		return (
			<>
				We couldn&apos;t find any results for <strong>{finalSearchText}</strong>
				<br />
				Check for spelling mistakes or try another search term.
			</>
		);
	}

	if (originalSearch) {
		return (
			<>
				Your search for <strong>{originalSearch.searchText}</strong> returned no
				results
				<br />
				{summaryRecordCount(data)}
			</>
		);
	}

	if (resultCount !== 0) {
		return <>{summaryRecordCount(data)}</>;
	}
};

const SearchIndexPage: FC<SearchIndexPageProps> = () => {
	const { siteTitleShort } = useSiteMetadata();
	const location = useLocation();

	const [data, setData] = useState<SearchResults | null>(null);
	const [announcement, setAnnouncement] = useState<string>("");

	useEffect(() => {
		setData(null);
		async function fetchData() {
			const searchResults = await search(location.search);
			setData(searchResults);
		}
		fetchData();
	}, [location.search]);

	useEffect(() => {
		if (data && data.failed)
			setAnnouncement("There was an error getting search results");

		if (!data) setAnnouncement("Loading search results");

		if (data && !data.failed) {
			const summary = `Showing ${data.firstResult} to ${data.lastResult} of ${data.resultCount}`;
			const spellcheck = data.finalSearchText
				? ` for ${data.finalSearchText}`
				: null;
			setAnnouncement(summary + spellcheck);
		}
	}, [data]);

	if (data && data.failed) return <ErrorPageContent />;

	return (
		<Layout>
			<SEO title={`${siteTitleShort} | Search Results`} />
			<Announcer announcement={announcement} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb>
					{!data ? "Loading search results" : "Search results"}
				</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				heading={`${siteTitleShort} search results`}
				lead={!data ? "Loading search results" : summaryText(data)}
			/>

			{data && data.resultCount === 0 && (
				<p id="results">{/* TODO no results landing page */}</p>
			)}

			{data && (
				<>
					<SearchCardList documents={data.documents} />
					<SearchPagination results={data} />
				</>
			)}
		</Layout>
	);
};

export default SearchIndexPage;
