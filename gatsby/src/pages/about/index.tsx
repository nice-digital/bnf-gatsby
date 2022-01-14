import { graphql, PageProps, Link } from "gatsby";
import { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export type AboutIndexPageProps = PageProps<{
	allAboutPages: {
		sectionList: {
			title: string;
			slug: string;
		}[];
	};
}>;

const AboutIndexPage: FC<AboutIndexPageProps> = ({
	data: {
		allAboutPages: { sectionList },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata();

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
				{sectionList.map(({ slug, title }) => (
					<li key={slug}>
						<Link
							to={`/about/${slug}/`}
							dangerouslySetInnerHTML={{ __html: title }}
						/>
					</li>
				))}
				<li>
					<Link to={`/about/labels/`}>Labels</Link>
				</li>
			</ol>
		</Layout>
	);
};

export const query = graphql`
	{
		allAboutPages: allBnfAboutSection(sort: { fields: order, order: ASC }) {
			sectionList: nodes {
				slug
				title
			}
		}
	}
`;

export default AboutIndexPage;
