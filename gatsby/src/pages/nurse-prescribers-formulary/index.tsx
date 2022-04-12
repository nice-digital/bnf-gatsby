import { Link } from "gatsby";
import React, { type FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { ColumnList } from "@nice-digital/nds-column-list";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useNursePrescribers } from "@/hooks/useNursePrescribers";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

const NursePrescribersFormularyIndexPage: FC = () => {
	const { siteTitleShort } = useSiteMetadata(),
		{ approvedList, treatmentSummariesList } = useNursePrescribers();

	return (
		<Layout>
			<SEO title="Nurse Prescribers' Formulary" />
			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb>Nurse Prescribers`&lsquo;` Formulary</Breadcrumb>
			</Breadcrumbs>
			<PageHeader id="content-start" heading={`Nurse Prescribers' Formulary`} />

			<ol className="list--unstyled">
				{approvedList.map(({ href, title }) => (
					<li key={href}>
						<Link to={href} dangerouslySetInnerHTML={{ __html: title }} />
					</li>
				))}
			</ol>

			<h2>Treatment summaries</h2>
			<ColumnList aria-label="Pages in the about section">
				{treatmentSummariesList.map(({ href, title }) => (
					<li key={href}>
						<Link to={href} dangerouslySetInnerHTML={{ __html: title }} />
					</li>
				))}
			</ColumnList>
		</Layout>
	);
};

export default NursePrescribersFormularyIndexPage;
