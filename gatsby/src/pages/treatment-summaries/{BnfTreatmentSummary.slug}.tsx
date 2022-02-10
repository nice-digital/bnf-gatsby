import { graphql, Link } from "gatsby";
import React, { FC } from "react";
import striptags from "striptags";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { Layout } from "@/components/Layout/Layout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import { type RecordSection } from "src/types";

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
