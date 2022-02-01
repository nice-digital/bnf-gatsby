import React from "react";

import styles from "./CautionaryAndAdvisoryLabel.module.scss";

export type CautionaryAndAdvisoryLabelProps = {
	description: string;
	englishRecommendation: string;
	welshRecommendation: string;
	number: number;
};

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
				<p lang="cy">{welshRecommendation}</p>
			</div>
			<div dangerouslySetInnerHTML={{ __html: description }}></div>
		</section>
	);
};
