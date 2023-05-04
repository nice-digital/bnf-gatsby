import { graphql } from "gatsby";
import React, { FC } from "react";
import striptags from "striptags";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { NursePrescribersFormularyMenu } from "@/components/NursePrescribersFormularyMenu/NursePrescribersFormularyMenu";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { NEWSEO } from "@/components/SEO/NEWSEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { MetaDescriptionsMap, SlugAndTitle, type RecordSection } from "@/utils";

import metas from "./{BnfNursePrescribersFormularyIntroduction.slug}.meta-descriptions.json";

export type NursePrescribersFormularyApprovedListPageProps = {
	data: {
		bnfNursePrescribersFormularyIntroduction: SlugAndTitle & {
			sections: RecordSection[];
		};
	};
	location: {
		pathname: string;
	};
};

export function Head({
	data: { bnfNursePrescribersFormularyIntroduction },
	location,
}: NursePrescribersFormularyApprovedListPageProps): JSX.Element {
	const { slug, title } = bnfNursePrescribersFormularyIntroduction;
	const titleNoHtml = striptags(title),
		/** The ancestors from the parent page e.g. ["About"] */
		parentTitleParts = ["Nurse Prescribers' Formulary"];

	const { isBNF } = useSiteMetadata(),
		metaDescription = (metas as MetaDescriptionsMap)[slug]?.[
			isBNF ? "bnf" : "bnfc"
		];

	if (typeof metaDescription !== "string")
		throw new Error(
			`Couldn't find meta description for page '${title}' at path '${location.pathname}'. Has the page been added or renamed?`
		);

	return (
		<NEWSEO
			title={[titleNoHtml, ...parentTitleParts].filter(Boolean).join(" | ")}
			description={"metaDescription"}
		/>
	);
}

const NursePrescribersFormularyApprovedListPage: FC<
	NursePrescribersFormularyApprovedListPageProps
> = ({
	data: {
		bnfNursePrescribersFormularyIntroduction: { title, sections, slug },
	},
}) => {
	return (
		<DetailsPageLayout
			titleHtml={title}
			menu={NursePrescribersFormularyMenu}
			asideContent={<></>}
			parentBreadcrumbs={[
				{
					href: "/nurse-prescribers-formulary/",
					text: "Nurse Prescribers' Formulary",
				},
			]}
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
	query {
		bnfNursePrescribersFormularyIntroduction {
			title
			slug
			sections {
				...RecordSection
			}
		}
	}
`;

export default NursePrescribersFormularyApprovedListPage;
