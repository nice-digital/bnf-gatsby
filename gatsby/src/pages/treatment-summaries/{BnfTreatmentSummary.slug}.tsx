import { graphql } from "gatsby";
import React, { FC } from "react";
import striptags from "striptags";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { type RecordSection } from "@/utils";

export type TreatmentSummaryPageProps = {
	data: {
		bnfTreatmentSummary: {
			title: string;
			sections: RecordSection[];
		};
	};
};

const TreatmentSummaryPage: FC<TreatmentSummaryPageProps> = ({
	data: {
		bnfTreatmentSummary: { title, sections },
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
		}
	}
`;

export default TreatmentSummaryPage;
