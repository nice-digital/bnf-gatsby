import { graphql } from "gatsby";
import React, { type FC } from "react";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { type RecordSection } from "@/utils";

export type WoundManagementIndexPageProps = {
	data: {
		bnfWoundManagementIntroduction: {
			title: string;
			sections: RecordSection[];
		};
	};
};

const WoundManagementIndexPage: FC<WoundManagementIndexPageProps> = ({
	data: {
		bnfWoundManagementIntroduction: { title, sections },
	},
}) => {
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
