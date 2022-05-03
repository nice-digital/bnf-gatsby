import { graphql } from "gatsby";
import React, { FC } from "react";

import { BorderlineSubstancesMenu } from "@/components/BorderlineSubstancesMenu/BorderlineSubstancesMenu";
import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { type RecordSection } from "@/utils";

export type BorderlineSubstanceIntroductionPageProps = {
	data: {
		bnfBorderlineSubstancesIntroduction: {
			title: string;
			sections: RecordSection[];
		};
	};
};

const BorderlineSubstanceIntroductionPage: FC<
	BorderlineSubstanceIntroductionPageProps
> = ({
	data: {
		bnfBorderlineSubstancesIntroduction: { title, sections },
	},
}) => {
	return (
		<DetailsPageLayout
			titleHtml={title}
			parentTitleParts={["Borderline Substances"]}
			sections={sections.map(({ slug, title }) => ({
				id: slug,
				title,
			}))}
			menu={BorderlineSubstancesMenu}
		>
			<RecordSectionsContent sections={sections} />
		</DetailsPageLayout>
	);
};

export const query = graphql`
	query {
		bnfBorderlineSubstancesIntroduction {
			title
			sections {
				...RecordSection
			}
		}
	}
`;

export default BorderlineSubstanceIntroductionPage;
