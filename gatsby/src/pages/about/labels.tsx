import { Link, graphql } from "gatsby";
import React, { FC } from "react";

import { AboutSectionMenu } from "@/components/AboutSectionMenu/AboutSectionMenu";
import { CautionaryAndAdvisoryLabel } from "@/components/CautionaryAndAdvisoryLabel/CautionaryAndAdvisoryLabel";
import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";

import styles from "./labels.module.scss";

export type CautionaryAdvisoryLabelsPageProps = {
	data: {
		allBnfCautionaryAndAdvisoryLabel: {
			advisoryLabels: {
				description: string;
				englishRecommendation: string;
				welshRecommendation: string;
				number: number;
			}[];
		};
	};
};

export const CautionaryAdvisoryLabelsGuidancePage: FC<
	CautionaryAdvisoryLabelsPageProps
> = ({
	data: {
		allBnfCautionaryAndAdvisoryLabel: { advisoryLabels },
	},
}) => {
	return (
		<DetailsPageLayout
			titleHtml={"Guidance for cautionary and advisory labels"}
			parentTitleParts={["About"]}
			parentBreadcrumbs={[{ href: "/about/", text: "About" }]}
			menu={AboutSectionMenu}
		>
			<ol className={styles.labelList}>
				{advisoryLabels.map((label) => (
					<li key={label.number}>
						<CautionaryAndAdvisoryLabel {...label} />
					</li>
				))}
			</ol>
		</DetailsPageLayout>
	);
};

export const query = graphql`
	{
		allBnfCautionaryAndAdvisoryLabel(sort: { fields: number, order: ASC }) {
			advisoryLabels: nodes {
				description
				englishRecommendation
				welshRecommendation
				number
			}
		}
	}
`;

export default CautionaryAdvisoryLabelsGuidancePage;
