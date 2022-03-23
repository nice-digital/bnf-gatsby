import { Link } from "gatsby";
import { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { ColumnList } from "@nice-digital/nds-column-list";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

const GuidanceIndexPage: FC = () => {
	const { siteTitleShort } = useSiteMetadata();

	return (
		<Layout>
			<SEO title="Medicines guidance" />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb>Medicines guidance</Breadcrumb>
			</Breadcrumbs>

			<PageHeader id="content-start" heading="Medicines guidance" />

			<ColumnList aria-label="Pages in the medicines guidance section">
				TODO
			</ColumnList>
		</Layout>
	);
};

export default GuidanceIndexPage;
