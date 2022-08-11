import { Link, graphql, useStaticQuery } from "gatsby";
import * as React from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";

import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import styles from "./Hero.module.scss";

export type LastUpdatedDataQueryResult = {
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

	const { isBNF, siteTitleLong, siteTitleShort } = useSiteMetadata();

	return (
		<div className={styles.hero} id="content-start">
			<div className={styles.heroContainer}>
				<Breadcrumbs className={styles.breadcrumbs}>
					<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
					<Breadcrumb>{siteTitleShort}</Breadcrumb>
				</Breadcrumbs>
				<div className={styles.body}>
					<div className={styles.text}>
						<h1 className={styles.title}>
							{siteTitleLong} ({siteTitleShort})
						</h1>
						<p className={styles.intro}>
							{isBNF ? (
								<>
									Key information on the selection, prescribing, dispensing and
									administration of&nbsp;medicines.
								</>
							) : (
								<>
									Key information on the selection, prescribing, dispensing and
									administration of medicines used for&nbsp;children.
								</>
							)}
						</p>
					</div>
					<div className={styles.lastUpdated} data-tracking="last-updated">
						<h2 className={styles.lastUpdatedLabel}>Last updated: </h2>
						<time className={styles.lastUpdatedDate} dateTime={lastUpdatedDate}>
							{lastUpdatedDateFormatted}
						</time>
						<Link to="/about/changes/">See what&apos;s changed</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
