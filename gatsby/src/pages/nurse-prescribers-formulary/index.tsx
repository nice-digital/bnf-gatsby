import { Link } from "gatsby";
import React, { type FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { ColumnList } from "@nice-digital/nds-column-list";
import { PageHeader } from "@nice-digital/nds-page-header";

import { NEWSEO } from "@/components/SEO/NEWSEO";
import { useNursePrescribers } from "@/hooks/useNursePrescribers";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export function Head(): JSX.Element {
	return (
		<NEWSEO
			title="Nurse Prescribers' Formulary"
			description="View the list of NPF treatment summaries for drugs, conditions and scenarios managed by Community Practitioner Nurse Prescribers."
		/>
	);
}

const NursePrescribersFormularyIndexPage: FC = () => {
	const { siteTitleShort, isBNF } = useSiteMetadata(),
		{ aboutList, treatmentSummariesList } = useNursePrescribers();

	return (
		<>
			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb>Nurse Prescribers&rsquo; Formulary</Breadcrumb>
			</Breadcrumbs>
			<PageHeader id="content-start" heading={`Nurse Prescribers' Formulary`} />

			<h2>About the Nurse Prescribers&rsquo; Formulary</h2>
			<ol className="list--unstyled">
				{aboutList.map(({ href, title }) => (
					<li key={href}>
						<Link
							className="p"
							to={href}
							dangerouslySetInnerHTML={{ __html: title }}
						/>
					</li>
				))}
			</ol>

			{isBNF && (
				<>
					<h2>Treatment summaries</h2>
					<ColumnList
						aria-label="Treatment summary pages"
						data-tracking="treatment-summary-column-list"
					>
						{treatmentSummariesList.map(({ href, title }) => (
							<li key={href}>
								<Link to={href} dangerouslySetInnerHTML={{ __html: title }} />
							</li>
						))}
					</ColumnList>
				</>
			)}
		</>
	);
};

export default NursePrescribersFormularyIndexPage;
