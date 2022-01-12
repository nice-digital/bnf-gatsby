import { useLocation } from "@reach/router";
import { PageProps, Link } from "gatsby";
import { FC, useEffect, useState } from "react";

import { FilterSummary } from "@nice-digital/nds-filters";
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

const searchAPIUrl = process.env.GATSBY_SEARCH_URL;

const SearchIndexPage: FC<SearchIndexPageProps> = () => {
	const { siteTitleShort, isBNF } = useSiteMetadata();

	const bnfIndex = isBNF ? "bnf" : "bnfc";

	//TODO state management
	const [data, setData] = useState<SearchResults | null>(null);
	const [a11yMessage, setA11yMessage] = useState<string>("");

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

	//TODO loading icon move into layout
	if (!data) return "loading...";

	const { q } = getSearchUrl(location.search);

	console.log("###", data.finalSearchText, data.originalSearch?.searchText);

	return (
		<Layout>
			{/* TODO breadcrumb */}
			<SEO title={`${siteTitleShort} | Search Results`} />
			<h1 className="visually-hidden">{siteTitleShort} search results</h1>

			{/* TODO accessibility announcement */}

			{/* <div className="page-header">
				<h1 className="page-header__heading">
					{siteTitleShort} search results
				</h1>
				<p className="page-header__lead">
					Your search for <b>aspirrin</b> returned no results
					<br />
					105 results for <b>aspirin</b>
				</p>
			</div> */}
			<FilterSummary id="filter-summary">
				{data.resultCount === 0 ? (
					data.originalSearch ? (
						<>
							Your search for <strong>{data.originalSearch.searchText}</strong>{" "}
							returned no results
						</>
					) : (
						<>
							No results for <strong>{data.finalSearchText}</strong>
						</>
					)
				) : (
					<>
						{data.originalSearch && (
							<>
								Your search for{" "}
								<strong>{data.originalSearch.searchText}</strong> returned no
								results
								<br />
							</>
						)}
						Showing {data.firstResult} to {data.lastResult} of{" "}
						{data.resultCount}
						{data.finalSearchText && (
							<>
								{" "}
								for <strong>{data.finalSearchText}</strong>
							</>
						)}
					</>
				)}
			</FilterSummary>

			{data.resultCount === 0 ? (
				<p id="results">
					We can&apos;t find any results.
					{/* TODO no results landing page */}
				</p>
			) : (
				<SearchCardList documents={data.documents} />
			)}

			<SearchPagination results={data} />
		</Layout>
	);
};

export default SearchIndexPage;
