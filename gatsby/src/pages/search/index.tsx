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

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export type SearchIndexPageProps = PageProps<{ someprop: "somevalue" }>;

//TODO Search Result Types

const SearchIndexPage: FC<SearchIndexPageProps> = () => {
	const { siteTitleShort, isBNF } = useSiteMetadata();

	const bnfIndex = isBNF ? "bnf" : "bnfc";

	//TODO state management
	const [data, setData] = useState<SearchResults | null>(null);
	const [error, setError] = useState<boolean>(false);
	const [a11yMessage, setA11yMessage] = useState<string>("");

	//TODO location useEffect
	const location = useLocation();

	function temporaryFetch() {
		//TODO change hardcoded url to use index from gatsby and url from env
		const searchUrl = searchAPIUrl + "/search" + location.search + "&index=bnf";
		fetch(searchUrl)
			.then((data) => data.json())
			.then((results) => {
				setError(false);
				console.log("results! " + results);
				setData(results as SearchResults);
			})
			.catch((err) => {
				setError(true);
				console.log("error ", err);
			});
	}

	const searchAPIUrl = process.env.GATSBY_SEARCH_URL;

	//TODO replace harcoded baseURL
	// initialise({
	// 	baseURL: "https://alpha-search-api.nice.org.uk/api",
	// 	index: bnfIndex,
	// });

	useEffect(() => {
		setData(null);

		temporaryFetch();

		//TODO use searchClient methods

		async function fetchData() {
			initialise({
				baseURL: "https://alpha-search-api.nice.org.uk/api",
				index: "bnf",
			});
			const searchResults = await search(location.search);
		}

		fetchData();
	}, [location.search]);

	//TODO data useEffect
	useEffect(() => {
		console.log("data! ", data);
	}, [data]);

	console.log("search api - ", searchAPIUrl);

	return (
		<Layout>
			<SEO title="Search Results" />
			<p>Search Results here...</p>
			{/* TODO accessibility announcement */}
			{/* TODO Error message */}
			{/* TODO Results list  */}
			{/* TODO Pagination Wrapper */}
		</Layout>
	);
};

export default SearchIndexPage;
