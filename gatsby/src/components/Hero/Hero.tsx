import { Link, graphql, useStaticQuery } from "gatsby";
import * as React from "react";

type LastUpdatedDataQueryResult = {
	bnfMetadata: {
		lastUpdatedDate: string;
		lastUpdatedDateFormatted: string;
		runTag: string;
	};
};

const query = graphql`
	query LastUpdatedQuery {
		bnfMetadata {
			lastUpdatedDateFormatted: exportStarted(formatString: "D MMMM YYYY")
			lastUpdatedDate: exportStarted
			runTag
		}
	}
`;

export const Hero: React.FC = () => {
	const {
		bnfMetadata: { lastUpdatedDate, lastUpdatedDateFormatted },
	} = useStaticQuery<LastUpdatedDataQueryResult>(query);

	return (
		<div className="">
			<h2 className="h5 mt--0">Last updated: </h2>
			<time className="h3" dateTime={lastUpdatedDate}>
				{lastUpdatedDateFormatted}
			</time>
			<Link to="/about/changes/">See what&apos;s changed</Link>
		</div>
	);
};
