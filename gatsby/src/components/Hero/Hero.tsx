import { Link, graphql, useStaticQuery } from "gatsby";
import * as React from "react";

import styles from "./Hero.module.scss";

export type LastUpdatedDataQueryResult = {
	bnfMetadata: {
		lastUpdatedDate: string;
		lastUpdatedDateFormatted: string;
		runTag: string;
	};
};

type HeroProps = {
	isBNF: boolean;
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

export const Hero: React.FC<HeroProps> = (props) => {
	const {
		bnfMetadata: { lastUpdatedDate, lastUpdatedDateFormatted },
	} = useStaticQuery<LastUpdatedDataQueryResult>(query);

	const { isBNF } = props;

	return (
		<div className={styles.hero} id="content-start">
			<div className={styles.heroContainer}>
				<div className={styles.text}>
					<h1 className={styles.title}>
						{isBNF
							? "British National Formulary (BNF)"
							: "British National Formulary for Children (BNFC)"}
					</h1>
					<p className={styles.intro}>
						Key information on the selection, prescribing, dispensing and
						administration of medicines.
					</p>
				</div>
				<div className={styles.lastUpdated}>
					<h2 className="h5">Last updated: </h2>
					<time className="h3" dateTime={lastUpdatedDate}>
						<strong>{lastUpdatedDateFormatted}</strong>
					</time>
					<Link to="/about/changes/">See what&apos;s changed</Link>
				</div>
			</div>
		</div>
	);
};
