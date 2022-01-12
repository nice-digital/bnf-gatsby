import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import { FC, useCallback } from "react";

import { EnhancedPagination } from "@nice-digital/nds-enhanced-pagination";
import {
	removeQueryParam,
	SearchResultsSuccess,
	upsertQueryParam,
} from "@nice-digital/search-client";

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
					? removeQueryParam(location.pathname, "pa")
					: upsertQueryParam(location.pathname, "pa", String(pageNumber)),
			[location]
		);

	return (
		<EnhancedPagination
			elementType={(props) => <Link {...props} />}
			method="to"
			currentPage={currentPage}
			totalPages={totalPages}
			mapPageNumberToHref={mapPageNumberToHref}
		/>
	);
};
