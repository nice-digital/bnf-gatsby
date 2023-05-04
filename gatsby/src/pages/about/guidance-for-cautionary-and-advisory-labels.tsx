import { graphql } from "gatsby";
import React, { type FC } from "react";
import striptags from "striptags";

import { AboutSectionMenu } from "@/components/AboutSectionMenu/AboutSectionMenu";
import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { NEWSEO } from "@/components/SEO/NEWSEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { type RecordSection } from "@/utils";

interface HeadProps {
	data: {
		bnfCautionaryAndAdvisoryGuidance: {
			title: string;
		};
	};
}
export function Head({
	data: { bnfCautionaryAndAdvisoryGuidance },
}: HeadProps): JSX.Element {
	const { title } = bnfCautionaryAndAdvisoryGuidance,
		titleNoHtml = striptags(title),
		/** The ancestors from the parent page e.g. ["About"] */
		parentTitleParts = ["About"],
		{ siteTitleShort } = useSiteMetadata();

	return (
		<NEWSEO
			title={[titleNoHtml, ...parentTitleParts].filter(Boolean).join(" | ")}
			description={`View explanatory information on the usage of recommended ${siteTitleShort} cautionary and advisory labels that pharmacists add when dispensing.`}
		/>
	);
}

export type CautionaryAdvisoryGuidancePageProps = {
	data: {
		bnfCautionaryAndAdvisoryGuidance: {
			title: string;
			sections: RecordSection[];
		};
	};
};

const CautionaryAdvisoryGuidancePage: FC<
	CautionaryAdvisoryGuidancePageProps
> = ({
	data: {
		bnfCautionaryAndAdvisoryGuidance: { title, sections },
	},
}) => {
	return (
		<DetailsPageLayout
			titleHtml={title}
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
};

export const query = graphql`
	{
		bnfCautionaryAndAdvisoryGuidance {
			title
			sections {
				...RecordSection
			}
		}
	}
`;

export default CautionaryAdvisoryGuidancePage;
