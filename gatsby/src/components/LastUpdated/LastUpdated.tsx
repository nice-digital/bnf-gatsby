import { Link, graphql, useStaticQuery } from "gatsby";
import * as React from "react";

type LastUpdatedDataQueryResult = {
	bnfMetadata: {
		lastUpdatedDate: string;
		lastUpdatedDateFormatted: string;
		runTag: string;
	};
};

export const LastUpdated: React.FC = () => {
	const data: LastUpdatedDataQueryResult =
		useStaticQuery<LastUpdatedDataQueryResult>(graphql`
			query LastUpdatedQuery {
				bnfMetadata {
					lastUpdatedDateFormatted: exportStarted(formatString: "D MMMM YYYY")
					lastUpdatedDate: exportStarted
					runTag
				}
			}
		`);

	return (
		<div className="">
			<h2 className="h5 mt--0">Last updated: </h2>
			<time className="h3" dateTime={data.bnfMetadata.lastUpdatedDate}>
				<strong>{data.bnfMetadata.lastUpdatedDateFormatted}</strong>
			</time>
			<Link to="/about/changes/">See what&apos;s changed</Link>
		</div>
	);
};
