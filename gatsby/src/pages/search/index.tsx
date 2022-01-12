import { useLocation } from "@reach/router";
import { graphql, PageProps, Link } from "gatsby";
import { FC, useEffect, useState } from "react";

import {
	search,
	initialise,
	SearchResults,
	getSearchUrl,
	getActiveModifiers,
	removeQueryParam,
	SearchUrl,
	SearchResultsSuccess,
	upsertQueryParam,
	getUrlPathAndQuery,
} from "@nice-digital/search-client";

import { ErrorPageContent } from "@/components/ErrorPageContent/ErrorPageContent";
import { Layout } from "@/components/Layout/Layout";
import { SearchCardList } from "@/components/SearchCardList/SearchCardList";
import { SearchPagination } from "@/components/SearchPagination/SearchPagination";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export type SearchIndexPageProps = PageProps<{ someprop: "somevalue" }>;

//TODO Search Result Types

const searchAPIUrl = process.env.GATSBY_SEARCH_URL;

const SearchIndexPage: FC<SearchIndexPageProps> = () => {
	const { siteTitleShort, isBNF } = useSiteMetadata();

	const bnfIndex = isBNF ? "bnf" : "bnfc";

	//TODO state management
	const [data, setData] = useState<SearchResults | null>(null);
	const [a11yMessage, setA11yMessage] = useState<string>("");

	//TODO location useEffect
	const location = useLocation();

	useEffect(() => {
		setData(null);
		async function fetchData() {
			initialise({
				baseURL: "https://alpha-search-api.nice.org.uk/api",
				index: bnfIndex,
			});
			const searchResults = await search(location.search);
			setData(searchResults);
		}
		fetchData();
	}, [location.search]);

	if (data && data.failed) return <ErrorPageContent />;

	//TODO loading icon
	if (!data) return "loading...";

	return (
		<Layout>
			<SEO title={`${siteTitleShort} | Search Results`} />
			<h1>Search Results</h1>

			<div>
				<p>
					You are viewing {isBNF ? "BNF" : "BNFC"}. If you require{" "}
					{isBNF ? "BNFC for Children" : "BNF"}, use{" "}
					{isBNF ? (
						<a href="https://bnfc.nice.org.uk">BNFC.</a>
					) : (
						<a href="https://bnf.nice.org.uk">BNF.</a>
					)}
				</p>
			</div>

			{/* TODO accessibility announcement */}
			{/* TODO Error message */}
			{data && data.documents.length === 0 ? (
				<p id="results">
					We can&apos;t find any results. Try{" "}
					<Link to="/somewhere">clearing your filters</Link> and starting again.
				</p>
			) : (
				<SearchCardList documents={data.documents} />
			)}
			{/* TODO Pagination Wrapper */}
			<SearchPagination results={data} scrollTargetId="filter-summary" />
		</Layout>
	);
};

export default SearchIndexPage;
