import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import { FC, useCallback } from "react";

import { EnhancedPagination } from "@nice-digital/nds-enhanced-pagination";
import {
	removeQueryParam,
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
		currentPage = Math.ceil(firstResult / pageSize),
		mapPageNumberToHref = useCallback(
			(pageNumber: number) =>
				pageNumber === 1
					? removeQueryParam(location.pathname + location.search, "pa")
					: upsertQueryParam(
							location.pathname + location.search,
							"pa",
							String(pageNumber)
					  ),
			[location]
		);

	return (
		<div className={styles.pagination}>
			<EnhancedPagination
				elementType={Link}
				method="to"
				currentPage={currentPage}
				totalPages={totalPages}
				mapPageNumberToHref={mapPageNumberToHref}
			/>
		</div>
	);
};
