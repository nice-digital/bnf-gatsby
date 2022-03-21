import { graphql } from "gatsby";
import React, { FC } from "react";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";

import { type RecordSection } from "src/types";

export type NursePrescribersFormularyTreatmentSummaryPageProps = {
	data: {
		bnfNursePrescribersFormularyTreatmentSummary: {
			title: string;
			sections: RecordSection[];
		};
	};
};

const NursePrescribersFormularyTreatmentSummaryPage: FC<
	NursePrescribersFormularyTreatmentSummaryPageProps
> = ({
	data: {
		bnfNursePrescribersFormularyTreatmentSummary: { title, sections },
	},
}) => {
	return (
		<DetailsPageLayout
			titleHtml={title}
			parentTitleParts={["Nurse Prescribers' Formulary"]}
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
	query ($id: String) {
		bnfNursePrescribersFormularyTreatmentSummary(id: { eq: $id }) {
			title
			sections {
				...RecordSection
			}
		}
	}
`;

export default NursePrescribersFormularyTreatmentSummaryPage;
