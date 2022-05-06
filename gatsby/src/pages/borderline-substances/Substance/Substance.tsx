import { FC } from "react";
import striptags from "striptags";

import { FeedBorderlineSubstance } from "@nice-digital/gatsby-source-bnf";
import { Alert } from "@nice-digital/nds-alert";

import { Accordion } from "@/components/Accordion/Accordion";
import { QueryResult } from "@/utils";

import styles from "./../{BnfBorderlineSubstancesTaxonomy.slug}.module.scss";
import Presentation from "./Presentation/Presentation";

export type SubstancesProps = {
	substance: QueryResult<FeedBorderlineSubstance>;
	label?: string;
};

const Substance: FC<SubstancesProps> = ({ substance, label }) => {
	return (
		<>
			<Accordion
				title={
					<>
						<h2
							key={substance.title}
							id={substance.id}
							className={styles.prepHeading}
						>
							<span className={styles.headingIcons}>
								{label ? <span className={styles.label}> {label} </span> : null}
							</span>
							<span className={styles.headingText}>{substance.title} </span>
						</h2>
						{substance && substance.introductionNote && (
							<Alert type="info">
								{striptags(substance?.introductionNote)}
							</Alert>
						)}
					</>
				}
			>
				{" "}
				{substance.presentations?.map((presentation, i) => (
					<Presentation key={i} presentation={presentation}></Presentation>
				))}
			</Accordion>
		</>
	);
};

export default Substance;
