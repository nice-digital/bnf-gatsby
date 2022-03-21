import { graphql } from "gatsby";
import React, { type FC } from "react";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";

import { type RecordSection } from "../../types";

export type WoundManagementIndexPageProps = {
	data: {
		bnfWoundManagementIntroduction: {
			title: string;
			sections: RecordSection[];
		} | null;
	};
};

const WoundManagementIndexPage: FC<WoundManagementIndexPageProps> = ({
	data: { bnfWoundManagementIntroduction },
}) => {
	// There is no wound management section for BNFC so return null but also the page will get deleted in gatsby-node
	if (!bnfWoundManagementIntroduction) return null;

	const { title, sections } = bnfWoundManagementIntroduction;

	return (
		<DetailsPageLayout
			titleHtml={title}
			sections={sections.map(({ slug, title }) => ({
				id: slug,
				title,
			}))}
		>
			<RecordSectionsContent sections={sections} />
		</DetailsPageLayout>
	);
};

export const query = graphql`
	{
		bnfWoundManagementIntroduction {
			title
			sections {
				...RecordSection
			}
		}
	}
`;

export default WoundManagementIndexPage;
