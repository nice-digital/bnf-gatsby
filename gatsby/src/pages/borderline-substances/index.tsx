import { graphql } from "gatsby";
import React, { FC } from "react";
import striptags from "striptags";

import { BorderlineSubstancesMenu } from "@/components/BorderlineSubstancesMenu/BorderlineSubstancesMenu";
import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { NEWSEO } from "@/components/SEO/NEWSEO";
import { type RecordSection } from "@/utils";

export type BorderlineSubstanceIntroductionPageProps = {
	data: {
		bnfBorderlineSubstancesIntroduction: {
			title: string;
			sections: RecordSection[];
		};
	};
};

export function Head({
	data: { bnfBorderlineSubstancesIntroduction },
}: BorderlineSubstanceIntroductionPageProps): JSX.Element {
	console.log("FROM HEAD ", bnfBorderlineSubstancesIntroduction);
	const { title } = bnfBorderlineSubstancesIntroduction,
		/** The ancestors from the parent page e.g. ["About"] */
		parentTitleParts = ["Borderline Substances"],
		titleNoHtml = striptags(title);

	return (
		<NEWSEO
			title={[titleNoHtml, ...parentTitleParts].filter(Boolean).join(" | ")}
			description={
				"Find information on ACBS approved foods and other borderline substances which have been formulated for use in managing medical conditions."
			}
		/>
	);
}

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
