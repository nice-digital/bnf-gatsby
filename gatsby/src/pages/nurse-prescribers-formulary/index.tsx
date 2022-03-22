import { graphql } from "gatsby";
import React, { type FC } from "react";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { type RecordSection } from "@/utils";

export type NursePrescribersFormularyIndexPageProps = {
	data: {
		bnfNursePrescribersFormularyIntroduction: {
			title: string;
			sections: RecordSection[];
		};
	};
};

const NursePrescribersFormularyIndexPage: FC<
	NursePrescribersFormularyIndexPageProps
> = ({
	data: {
		bnfNursePrescribersFormularyIntroduction: { title, sections },
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
		bnfNursePrescribersFormularyIntroduction {
			title
			sections {
				...RecordSection
			}
		}
	}
`;

export default NursePrescribersFormularyIndexPage;
