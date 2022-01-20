import { graphql } from "gatsby";
import React, { type FC } from "react";

import { AboutSectionMenu } from "@/components/AboutSectionMenu/AboutSectionMenu";
import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";

import { type RecordSection } from "src/types";

export type AboutSectionPageProps = {
	data: {
		currentAboutPage: {
			title: string;
			sections: RecordSection[];
		};
	};
};

const AboutSectionPage: FC<AboutSectionPageProps> = ({
	data: {
		currentAboutPage: { title, sections },
	},
}) => (
	<DetailsPageLayout
		titleHtml={title}
		parentTitleParts={["About"]}
		parentBreadcrumbs={[{ href: "/about/", text: "About" }]}
		menu={AboutSectionMenu}
	>
		<RecordSectionsContent sections={sections} />
	</DetailsPageLayout>
);

export const query = graphql`
	query ($id: String) {
		currentAboutPage: bnfAboutSection(id: { eq: $id }) {
			title
			sections {
				...RecordSection
			}
		}
	}
`;

export default AboutSectionPage;
