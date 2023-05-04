import { graphql } from "gatsby";
import React, { FC } from "react";
import striptags from "striptags";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { NursePrescribersFormularyMenu } from "@/components/NursePrescribersFormularyMenu/NursePrescribersFormularyMenu";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import {
	RelatedDrugs,
	sectionHeading as relatedDrugsHeading,
	sectionId as relatedDrugsId,
} from "@/components/RelatedDrugs/RelatedDrugs";
import { NEWSEO } from "@/components/SEO/NEWSEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import {
	type RecordSection,
	type MetaDescriptionsMap,
	type SlugAndTitle,
} from "@/utils";

import metas from "./{BnfNursePrescribersFormularyTreatmentSummary.slug}.meta-descriptions.json";

export type NursePrescribersFormularyTreatmentSummaryPageProps = {
	data: {
		bnfNursePrescribersFormularyTreatmentSummary: SlugAndTitle & {
			sections: RecordSection[];
			relatedDrugs: SlugAndTitle[];
		};
	};
	location: {
		pathname: string;
	};
};

export function Head({
	data: { bnfNursePrescribersFormularyTreatmentSummary },
	location,
}: NursePrescribersFormularyTreatmentSummaryPageProps): JSX.Element {
	const { slug, title } = bnfNursePrescribersFormularyTreatmentSummary;
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
			description={metaDescription}
		/>
	);
}

const NursePrescribersFormularyTreatmentSummaryPage: FC<
	NursePrescribersFormularyTreatmentSummaryPageProps
> = ({
	data: {
		bnfNursePrescribersFormularyTreatmentSummary: {
			title,
			sections,
			relatedDrugs,
		},
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
			sections={sections
				.map(({ slug, title }) => ({
					id: slug,
					title,
				}))
				.concat(
					relatedDrugs.length > 0
						? { id: relatedDrugsId, title: relatedDrugsHeading }
						: []
				)}
		>
			<RecordSectionsContent sections={sections} />
			<RelatedDrugs drugs={relatedDrugs} />
		</DetailsPageLayout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfNursePrescribersFormularyTreatmentSummary(id: { eq: $id }) {
			title
			slug
			sections {
				...RecordSection
			}
			relatedDrugs {
				title
				slug
			}
		}
	}
`;

export default NursePrescribersFormularyTreatmentSummaryPage;
