import { graphql } from "gatsby";
import React, { FC } from "react";
import striptags from "striptags";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { Tag, TagList } from "@/components/TagList/TagList";
import { type SlugAndTitle, type RecordSection } from "@/utils";

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
	const titleNoHtml = striptags(title);

	return (
		<DetailsPageLayout
			titleHtml={title}
			metaDescription={`This treatment summary topic describes ${titleNoHtml}`}
			parentTitleParts={["Treatment summaries"]}
			parentBreadcrumbs={[
				{ href: "/treatment-summaries/", text: "Treatment summaries" },
			]}
			sections={sections.map(({ slug, title }) => ({
				id: slug,
				title,
			}))}
		>
			<RecordSectionsContent sections={sections} />
			{relatedDrugs.length > 0 ? (
				<>
					<h2>Related drugs</h2>
					<TagList>
						{relatedDrugs
							.sort((a, b) => a.slug.localeCompare(b.slug))
							.map((drug) => (
								<Tag key={drug.slug} href={`/drugs/${drug.slug}/`}>
									{drug.title}
								</Tag>
							))}
					</TagList>
				</>
			) : null}
			{relatedTreatmentSummaries.length > 0 ? (
				<>
					<h2>Related treatment summaries</h2>
					<TagList>
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
				</>
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
