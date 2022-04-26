import React from "react";
import { Except } from "type-fest";

import { FeedLabel } from "@nice-digital/gatsby-source-bnf";

import styles from "./CautionaryAndAdvisoryLabel.module.scss";

export type CautionaryAndAdvisoryLabelProps = Except<FeedLabel, "qualifier">;

export const generateTitle = (labelNumber: number): string => {
	return `Label ${labelNumber}`;
};

export const generateId = (labelNumber: number): string => {
	return `label-${labelNumber}`;
};

export const CautionaryAndAdvisoryLabel: React.FC<
	CautionaryAndAdvisoryLabelProps
> = ({
	description,
	englishRecommendation,
	welshRecommendation,
	number,
}: CautionaryAndAdvisoryLabelProps) => {
	return (
		<section aria-labelledby={generateId(number)}>
			<h2 id={generateId(number)}>{generateTitle(number)}</h2>
			<div className={styles.label}>
				<p>{englishRecommendation}</p>
				<p lang="cy" className={styles.welsh}>
					{welshRecommendation}
				</p>
			</div>
			<div dangerouslySetInnerHTML={{ __html: description }}></div>
		</section>
	);
};
