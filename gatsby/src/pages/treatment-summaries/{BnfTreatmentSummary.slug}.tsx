import { graphql } from "gatsby";
import React, { FC } from "react";
import striptags from "striptags";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { RelatedDrugs } from "@/components/RelatedDrugs/RelatedDrugs";
import { NEWSEO } from "@/components/SEO/NEWSEO";
import { Tag, TagList } from "@/components/TagList/TagList";
import {
	type SlugAndTitle,
	type RecordSection,
	isTruthy,
	decapitalize,
} from "@/utils";

export type TreatmentSummaryPageProps = {
	data: {
		bnfTreatmentSummary: {
			title: string;
			sections: RecordSection[];
			relatedDrugs: SlugAndTitle[];
			relatedTreatmentSummaries: SlugAndTitle[];
		};
	};
};

export function Head({
	data: { bnfTreatmentSummary },
}: TreatmentSummaryPageProps): JSX.Element {
	const { title } = bnfTreatmentSummary;
	const titleNoHtml = striptags(title),
		/** The ancestors from the parent page e.g. ["About"] */
		parentTitleParts = ["Treatment summaries"];

	return (
		<NEWSEO
			title={[titleNoHtml, ...parentTitleParts].filter(Boolean).join(" | ")}
			description={`This treatment summary topic describes ${decapitalize(
				titleNoHtml
			)}`}
		/>
	);
}

const TreatmentSummaryPage: FC<TreatmentSummaryPageProps> = ({
	data: {
		bnfTreatmentSummary: {
			title,
			sections,
			relatedDrugs,
			relatedTreatmentSummaries,
		},
	},
}) => {
	return (
		<DetailsPageLayout
			titleHtml={title}
			parentBreadcrumbs={[
				{ href: "/treatment-summaries/", text: "Treatment summaries" },
			]}
			sections={[
				...sections.map(({ slug, title }) => ({
					id: slug,
					title,
				})),
				relatedDrugs.length > 0
					? {
							id: "related-drugs",
							title: "Related drugs",
					  }
					: null,
				relatedTreatmentSummaries.length > 0
					? {
							id: "related-treatment-summaries",
							title: "Related treatment summaries",
					  }
					: null,
			].filter(isTruthy)}
		>
			<RecordSectionsContent sections={sections} />
			<RelatedDrugs drugs={relatedDrugs} />
			{relatedTreatmentSummaries.length > 0 ? (
				<section aria-labelledby="related-treatment-summaries">
					<h2 id="related-treatment-summaries">Related treatment summaries</h2>
					<TagList aria-labelledby="related-treatment-summaries">
						{relatedTreatmentSummaries
							.sort((a, b) => a.slug.localeCompare(b.slug))
							.map((treatmentSummary) => (
								<Tag
									key={treatmentSummary.slug}
									href={`/treatment-summaries/${treatmentSummary.slug}/`}
								>
									{treatmentSummary.title}
								</Tag>
							))}
					</TagList>
				</section>
			) : null}
		</DetailsPageLayout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfTreatmentSummary(id: { eq: $id }) {
			title
			sections {
				...RecordSection
			}
			relatedDrugs {
				title
				slug
			}
			relatedTreatmentSummaries {
				title
				slug
			}
		}
	}
`;

export default TreatmentSummaryPage;
