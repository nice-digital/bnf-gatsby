import React, { ReactNode } from "react";

import styles from "./CautionaryAndAdvisoryLabel.module.scss";

type CautionaryAndAdvisoryLabelProps = {
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
		<>
			<p className={styles.label}>I am a label! {description}</p>
		</>
	);
};
