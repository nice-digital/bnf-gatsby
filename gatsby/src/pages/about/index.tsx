import { Link } from "gatsby";
import { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { ColumnList } from "@nice-digital/nds-column-list";
import { PageHeader } from "@nice-digital/nds-page-header";

import { SEO } from "@/components/SEO/SEO";
import { useAboutPages } from "@/hooks/useAboutPages";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

const AboutIndexPage: FC = () => {
	const { siteTitleShort } = useSiteMetadata(),
		aboutPages = useAboutPages();

	return (
		<>
			<SEO title="About" />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb>About</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={`About ${siteTitleShort}`}
				data-testid="page-header"
			/>

			<ColumnList
				aria-label="Pages in the about section"
				data-tracking="about-column-list"
			>
				{aboutPages.map(({ href, title }) => (
					<li key={href}>
						<Link to={href} dangerouslySetInnerHTML={{ __html: title }} />
					</li>
				))}
			</ColumnList>
		</>
	);
};

export default AboutIndexPage;
