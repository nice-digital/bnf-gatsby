import { useLocation } from "@reach/router";
import { Link } from "gatsby";
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

initialise({
	baseURL: process.env.GATSBY_SEARCH_URL as InitialiseOptions["baseURL"],
	index: isBNF ? "bnf" : "bnfc",
});

const SummaryRecordCount = ({
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

const SummaryText = (data: SearchResultsSuccess) => {
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
				<SummaryRecordCount {...data} />
			</>
		);
	}

	if (resultCount !== 0) {
		return <SummaryRecordCount {...data} />;
	}

	return null;
};

const SearchIndexPage: FC = () => {
	const { siteTitleShort } = useSiteMetadata();
	const location = useLocation();

	const [data, setData] = useState<SearchResults | null>(null);
	const [loading, setLoading] = useState<boolean>();
	const [announcement, setAnnouncement] = useState<string>("");

	useEffect(() => {
		setLoading(true);
		async function fetchData() {
			const searchResults = await search(location.search);
			setData(searchResults);
			setLoading(false);
		}
		fetchData();
	}, [location.search]);

	useEffect(() => {
		if (data && data.failed)
			setAnnouncement("There was an error getting search results");

		if (loading) setAnnouncement("Loading search results");

		if (data && !data.failed) {
			const summary = `Showing ${data.firstResult} to ${data.lastResult} of ${data.resultCount}`;
			const spellcheck = data.finalSearchText
				? ` for ${data.finalSearchText}`
				: null;
			setAnnouncement(summary + spellcheck);
		}
	}, [data, loading]);

	if (data && data.failed) return <ErrorPageContent />;

	const currentPage = data ? Math.ceil(data.firstResult / data.pageSize) : 0;

	let siteTitleParts: (string | undefined)[] = [];
	if (loading) siteTitleParts = ["Loading…"];
	else if (!data?.documents.length)
		siteTitleParts = ["No results", data?.finalSearchText];
	else if (data) {
		siteTitleParts = [
			currentPage > 1 ? `Page ${currentPage}` : "",
			data.finalSearchText,
		];
	}

	const breadcrumbText = `Search results ${
		data?.finalSearchText ? `for ${data.finalSearchText}` : ""
	}`;

	return (
		<Layout>
			<SEO
				title={[...siteTitleParts, "Search results"]
					.filter(Boolean)
					.join(" | ")}
				noIndex
			/>
			<Announcer announcement={announcement} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				{loading ? (
					<Breadcrumb>Loading search results…</Breadcrumb>
				) : currentPage <= 1 ? (
					<Breadcrumb>{breadcrumbText}</Breadcrumb>
				) : (
					<Breadcrumb
						to={`/search/?q=${data?.finalSearchText}`}
						elementType={Link}
					>
						{breadcrumbText}
					</Breadcrumb>
				)}
				{currentPage > 1 ? (
					<Breadcrumb>{`Page ${currentPage.toString(10)}`}</Breadcrumb>
				) : null}
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={`${siteTitleShort} search results`}
				lead={
					loading ? (
						"Loading search results…"
					) : data ? (
						<SummaryText {...data} />
					) : null
				}
			/>

			{data?.resultCount === 0 ? (
				<p id="results">{/* TODO no results landing page */}</p>
			) : null}

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
