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
		<section>
			<h2>Label {number}</h2>
			<div className={styles.label}>
				<p lang="en-GB">{englishRecommendation}</p>
				<p lang="cy">{welshRecommendation}</p>
			</div>
			<div dangerouslySetInnerHTML={{ __html: description }}></div>
		</section>
	);
};
