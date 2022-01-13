import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import { FC } from "react";

import { SimplePagination } from "@nice-digital/nds-simple-pagination";
import {
	SearchResultsSuccess,
	upsertQueryParam,
} from "@nice-digital/search-client";

import styles from "./SearchPagination.module.scss";

export interface SearchPaginationProps {
	results: SearchResultsSuccess;
}

export const SearchPagination: FC<SearchPaginationProps> = ({
	results: { firstResult, resultCount, pageSize },
}) => {
	const location = useLocation(),
		totalPages = Math.ceil(resultCount / pageSize),
		currentPage = Math.ceil(firstResult / pageSize);

	const nextPageLink =
		currentPage !== totalPages
			? {
					elementType: Link,
					destination: upsertQueryParam(
						location.pathname + location.search,
						"pa",
						String(currentPage + 1)
					),
			  }
			: undefined;

	const previousPageLink =
		currentPage > 1
			? {
					elementType: Link,
					destination: upsertQueryParam(
						location.pathname + location.search,
						"pa",
						String(currentPage - 1)
					),
			  }
			: undefined;

	return (
		<div className={styles.pagination}>
			<SimplePagination
				currentPage={currentPage}
				nextPageLink={nextPageLink}
				previousPageLink={previousPageLink}
				totalPages={totalPages}
			/>
		</div>
	);
};
