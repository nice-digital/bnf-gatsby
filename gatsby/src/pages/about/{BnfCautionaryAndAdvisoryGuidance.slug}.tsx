import { graphql } from "gatsby";
import React, { type FC } from "react";

import { AboutSectionMenu } from "@/components/AboutSectionMenu/AboutSectionMenu";
import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";

import { type RecordSection } from "src/types";

export type CautionaryAdvisoryGuidancePageProps = {
	data: {
		currentPage: {
			title: string;
			sections: RecordSection[];
		};
	};
};

const CautionaryAdvisoryGuidancePage: FC<
	CautionaryAdvisoryGuidancePageProps
> = ({
	data: {
		currentPage: { title, sections },
	},
}) => (
	<DetailsPageLayout
		titleHtml={title}
		parentTitleParts={["About"]}
		parentBreadcrumbs={[{ href: "/about/", text: "About" }]}
		menu={AboutSectionMenu}
		sections={sections.map(({ slug, title }) => ({
			id: slug,
			title,
		}))}
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

export default CautionaryAdvisoryGuidancePage;
