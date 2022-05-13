import { FC } from "react";

import { FeedBorderlineSubstance } from "@nice-digital/gatsby-source-bnf";
import { Alert } from "@nice-digital/nds-alert";

import { Accordion } from "@/components/Accordion/Accordion";
import { type QueryResult, type WithSlug } from "@/utils";

import Presentation from "./Presentation/Presentation";
import styles from "./Substance.module.scss";

export type SubstanceProps = {
	substance: WithSlug<QueryResult<FeedBorderlineSubstance>>;
	label?: string;
};

const Substance: FC<SubstanceProps> = ({
	substance: { title, slug, introductionNote, presentations },
	label,
}) => {
	return (
		<>
			<Accordion
				title={
					<>
						{introductionNote && (
							<Alert type="info">
								<div
									className={styles.alertContent}
									dangerouslySetInnerHTML={{ __html: introductionNote }}
								/>
							</Alert>
						)}
						<h2 id={slug} className={styles.prepHeading}>
							{label && (
								<span className={styles.headingIcons}>
									<span className={styles.label}>{label}</span>
								</span>
							)}
							<span
								className={styles.headingText}
								dangerouslySetInnerHTML={{ __html: title }}
							/>
						</h2>
					</>
				}
			>
				{presentations.map((presentation, i) => (
					<Presentation key={i} presentation={presentation}></Presentation>
				))}
			</Accordion>
		</>
	);
};

export default Substance;
