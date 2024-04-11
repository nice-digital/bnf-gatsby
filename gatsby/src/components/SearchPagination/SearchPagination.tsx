import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import { type FC } from "react";

import { SimplePagination } from "@nice-digital/nds-simple-pagination";
import {
	removeQueryParam,
	SearchResultsSuccess,
	upsertQueryParam,
} from "@nice-digital/search-client";

import styles from "./SearchPagination.module.scss";

export interface SearchPaginationProps {
	results: Pick<
		SearchResultsSuccess,
		"firstResult" | "resultCount" | "pageSize"
	>;
}

export const SearchPagination: FC<SearchPaginationProps> = ({
	results: { firstResult, resultCount, pageSize },
}) => {
	const { pathname, search } = useLocation(),
		pathAndQuery = pathname + search,
		totalPages = Math.ceil(resultCount / pageSize),
		currentPage = Math.ceil(firstResult / pageSize);

	const nextPageLink =
		currentPage !== totalPages
			? {
					elementType: Link,
					destination: upsertQueryParam(
						pathAndQuery,
						"pa",
						String(currentPage + 1)
					),
				}
			: undefined;

	const previousPageLink =
		currentPage > 1
			? {
					elementType: Link,
					destination:
						currentPage == 2
							? removeQueryParam(pathAndQuery, "pa")
							: upsertQueryParam(pathAndQuery, "pa", String(currentPage - 1)),
				}
			: undefined;

	return resultCount === 0 ? null : (
		<SimplePagination
			className={styles.pagination}
			currentPage={currentPage}
			nextPageLink={nextPageLink}
			previousPageLink={previousPageLink}
			totalPages={totalPages}
		/>
	);
};
