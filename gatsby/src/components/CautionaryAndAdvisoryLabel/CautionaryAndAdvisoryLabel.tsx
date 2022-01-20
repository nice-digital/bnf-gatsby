import React from "react";

import styles from "./CautionaryAndAdvisoryLabel.module.scss";

export type CautionaryAndAdvisoryLabelProps = {
	description: string;
	englishRecommendation: string;
	welshRecommendation: string;
	number: number;
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
		<section aria-labelledby={`label-${number}`}>
			<h2 id={`label-${number}`}>Label {number}</h2>
			<div className={styles.label}>
				<p>{englishRecommendation}</p>
				<p lang="cy">{welshRecommendation}</p>
			</div>
			<div dangerouslySetInnerHTML={{ __html: description }}></div>
		</section>
	);
};
