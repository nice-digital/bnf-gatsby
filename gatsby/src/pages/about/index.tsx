import { Link } from "gatsby";
import { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useAboutPages } from "@/hooks/useAboutPages";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

const AboutIndexPage: FC = () => {
	const { siteTitleShort } = useSiteMetadata(),
		aboutPages = useAboutPages();

	return (
		<Layout>
			<SEO title="About" />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb>About</Breadcrumb>
			</Breadcrumbs>

			<PageHeader heading={`About ${siteTitleShort}`} />

			<ol>
				{aboutPages.map(({ href, title }) => (
					<li key={href}>
						<Link to={href} dangerouslySetInnerHTML={{ __html: title }} />
					</li>
				))}
			</ol>
		</Layout>
	);
};

export default AboutIndexPage;
