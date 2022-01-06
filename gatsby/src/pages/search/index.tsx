import { graphql, PageProps, Link } from "gatsby";
import { FC } from "react";

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
	const { siteTitleShort } = useSiteMetadata();
	//TODO location useEffect
	//TODO data useEffect

	return (
		<Layout>
			<SEO title="Search Results" />
			<p>Search Results here...</p>
			{/* TODO announcement */}
			{/* TODO Error message */}
			{/* TODO Results list */}
			{/* TODO Pagination */}
		</Layout>
	);
};

export default SearchIndexPage;
