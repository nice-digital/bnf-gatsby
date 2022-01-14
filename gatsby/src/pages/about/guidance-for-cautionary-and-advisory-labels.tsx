import { PageProps, Link } from "gatsby";
import React, { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export type CautionaryAdvisoryLabelsGuidancePageProps = PageProps<{
	// TODO
}>;

const CautionaryAdvisoryLabelsGuidancePage: FC<
	CautionaryAdvisoryLabelsGuidancePageProps
> = ({ data }) => {
	const { siteTitleShort } = useSiteMetadata();

	return (
		<Layout>
			<SEO title={`Guidance for cautionary and advisory labels | About`} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb to="/about/" elementType={Link}>
					About
				</Breadcrumb>
				<Breadcrumb>Guidance for cautionary and advisory labels</Breadcrumb>
			</Breadcrumbs>

			<PageHeader heading="Guidance for cautionary and advisory labels" />
		</Layout>
	);
};

export default CautionaryAdvisoryLabelsGuidancePage;
