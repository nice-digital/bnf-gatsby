import { graphql } from "gatsby";
import React, { type FC } from "react";

import { AboutSectionMenu } from "@/components/AboutSectionMenu/AboutSectionMenu";
import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import { type RecordSection } from "src/types";

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
	const { siteTitleShort } = useSiteMetadata();

	return (
		<DetailsPageLayout
			titleHtml={title}
			parentTitleParts={["About"]}
			parentBreadcrumbs={[{ href: "/about/", text: "About" }]}
			menu={AboutSectionMenu}
			sections={sections.map(({ slug, title }) => ({
				id: slug,
				title,
			}))}
			metaDescription={`View explanatory information on the usage of recommended ${siteTitleShort} cautionary and advisory labels that pharmacists add when dispensing.`}
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
