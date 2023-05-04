import { Link } from "gatsby";
import { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { ColumnList } from "@nice-digital/nds-column-list";
import { PageHeader } from "@nice-digital/nds-page-header";

import { NEWSEO } from "@/components/SEO/NEWSEO";
import { useMedicinesGuidancePages } from "@/hooks/useMedicinesGuidancePages";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export function Head(): JSX.Element {
	return (
		<NEWSEO
			title="Medicines guidance"
			description="Browse medicines guidance, prescribing advice and related topics."
		/>
	);
}

const GuidanceIndexPage: FC = () => {
	const { siteTitleShort } = useSiteMetadata(),
		guidancePages = useMedicinesGuidancePages();

	return (
		<>
			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb>Medicines guidance</Breadcrumb>
			</Breadcrumbs>

			<PageHeader id="content-start" heading="Medicines guidance" />

			<ColumnList
				aria-label="Pages in the medicines guidance section"
				data-tracking="medicines-guidance-column-list"
			>
				{guidancePages.map(({ href, title }) => (
					<li key={href}>
						<Link to={href} dangerouslySetInnerHTML={{ __html: title }} />
					</li>
				))}
			</ColumnList>
		</>
	);
};

export default GuidanceIndexPage;
