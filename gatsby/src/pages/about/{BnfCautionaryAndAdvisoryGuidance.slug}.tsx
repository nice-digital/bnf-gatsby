import { type PageProps, graphql } from "gatsby";
import React, { type FC } from "react";

import { AboutSectionMenu } from "@/components/AboutSectionMenu/AboutSectionMenu";
import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";

import { type RecordSection } from "src/types";

export type CautionaryAdvisoryLabelsGuidancePageProps = PageProps<{
	currentPage: {
		title: string;
		sections: RecordSection[];
	};
}>;

const CautionaryAdvisoryLabelsGuidancePage: FC<
	CautionaryAdvisoryLabelsGuidancePageProps
> = ({
	data: {
		currentPage: { title, sections },
	},
}) => (
	<DetailsPageLayout
		titleHtml={title}
		parentBreadcrumbs={[{ href: "/about", text: "About" }]}
		menu={AboutSectionMenu}
	>
		<RecordSectionsContent sections={sections} />
	</DetailsPageLayout>
);

export const query = graphql`
	query ($id: String) {
		currentPage: bnfCautionaryAndAdvisoryGuidance(id: { eq: $id }) {
			title
			sections {
				...RecordSection
			}
		}
	}
`;

export default CautionaryAdvisoryLabelsGuidancePage;
