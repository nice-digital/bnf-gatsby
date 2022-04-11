import { graphql, Link } from "gatsby";
import React, { type FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { ColumnList } from "@nice-digital/nds-column-list";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useNursePrescribers } from "@/hooks/useNursePrescribers";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { type RecordSection } from "@/utils";

export type NursePrescribersFormularyIndexPageProps = {
	data: {
		bnfNursePrescribersFormularyIntroduction: {
			title: string;
			sections: RecordSection[];
		};
	};
};

const NursePrescribersFormularyIndexPage: FC<
	NursePrescribersFormularyIndexPageProps
> = ({
	data: {
		bnfNursePrescribersFormularyIntroduction: { title, sections },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata(),
		treatmentSummaries = useNursePrescribers();

	return (
		<Layout>
			<SEO title="Nurse Prescribers' Formulary" />
			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb>Nurse Prescribers' Formulary</Breadcrumb>
			</Breadcrumbs>
			<PageHeader id="content-start" heading={`Nurse Prescribers' Formulary`} />
			{/* TODO get this properly */}
			<Link to={`/`}>
				Approved list for prescribing by Community Practitioner Nurse
				Prescribers
			</Link>
			{/* TODO split treatmentSummaries to not have the approved list */}
			<h2>Treatment summaries</h2>
			<ColumnList aria-label="Pages in the about section">
				{treatmentSummaries.map(({ href, title }) => (
					<li key={href}>
						<Link to={href} dangerouslySetInnerHTML={{ __html: title }} />
					</li>
				))}
			</ColumnList>
		</Layout>
	);
};

export const query = graphql`
	{
		bnfNursePrescribersFormularyIntroduction {
			title
			sections {
				...RecordSection
			}
		}
	}
`;

export default NursePrescribersFormularyIndexPage;
