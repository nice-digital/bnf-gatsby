import { graphql } from "gatsby";
import React, { type FC } from "react";

import { AboutSectionMenu } from "@/components/AboutSectionMenu/AboutSectionMenu";
import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import {
	type SlugAndTitle,
	type RecordSection,
	type MetaDescriptionsMap,
} from "@/utils";

import metas from "./{BnfAboutSection.slug}.meta-descriptions.json";

export type AboutSectionPageProps = {
	data: {
		currentAboutPage: SlugAndTitle & {
			sections: RecordSection[];
		};
	};
	location: {
		pathname: string;
	};
};

const AboutSectionPage: FC<AboutSectionPageProps> = ({
	data: {
		currentAboutPage: { slug, title, sections },
	},
	location: { pathname },
}) => {
	const { isBNF } = useSiteMetadata(),
		metaDescription = (metas as MetaDescriptionsMap)[slug]?.[
			isBNF ? "bnf" : "bnfc"
		];

	if (typeof metaDescription !== "string")
		throw new Error(
			`Couldn't find meta description for page '${title}' at path '${pathname}'. Has the page been added or renamed?`
		);

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
			metaDescription={metaDescription}
		>
			<RecordSectionsContent sections={sections} />
		</DetailsPageLayout>
	);
};

export const query = graphql`
	query ($id: String) {
		currentAboutPage: bnfAboutSection(id: { eq: $id }) {
			slug
			title
			sections {
				...RecordSection
			}
		}
	}
`;

export default AboutSectionPage;
