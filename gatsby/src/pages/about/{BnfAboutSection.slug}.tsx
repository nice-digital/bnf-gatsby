import { graphql, PageProps, Link } from "gatsby";
import React, { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { InPageNav } from "@nice-digital/nds-in-page-nav";
import { PageHeader } from "@nice-digital/nds-page-header";
import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import styles from "./{BnfAboutSection.slug}.module.scss";

export type AboutDetailsPageProps = PageProps<{
	currentAboutPage: {
		title: string;
		sections: {
			order: number;
			title: string;
			slug: string;
			content: string;
		}[];
	};
	allBnfAboutSection: {
		allAboutPages: {
			id: string;
			title: string;
			slug: string;
		}[];
	};
}>;

const AboutDetailsPage: FC<AboutDetailsPageProps> = ({
	data: {
		currentAboutPage: { title, sections },
		allBnfAboutSection: { allAboutPages },
	},
}) => {
	sections = sections.sort((a, b) => a.order - b.order);

	const { siteTitleShort } = useSiteMetadata();

	return (
		<Layout>
			<SEO title={`${title} | About`} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb to="/about/" elementType={Link}>
					About
				</Breadcrumb>
				<Breadcrumb>{title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				heading={<div dangerouslySetInnerHTML={{ __html: title }} />}
			/>

			<Grid gutter="loose">
				<GridItem cols={12} md={4} lg={3}>
					<StackedNav
						label="About"
						link={{ destination: "/about/", elementType: Link }}
					>
						{allAboutPages.map((aboutPage) => (
							<StackedNavLink
								key={aboutPage.id}
								destination={`/about/${aboutPage.slug}/`}
								elementType={Link}
								isCurrent={aboutPage.title === title}
							>
								<span dangerouslySetInnerHTML={{ __html: aboutPage.title }} />
							</StackedNavLink>
						))}
					</StackedNav>
				</GridItem>
				<GridItem cols={12} md={8} lg={9}>
					<Grid reverse gutter="loose">
						<GridItem cols={12} lg={3}>
							<nav aria-labelledby="on-this-page">
								<h2 id="on-this-page" className="h4">
									On this page
								</h2>
								<ol aria-label="Jump links to section on this page">
									{sections.map((section, i) => (
										<li key={section.slug}>
											<a href={`#${section.slug}`}>
												<span
													dangerouslySetInnerHTML={{ __html: section.title }}
												/>
											</a>
										</li>
									))}
								</ol>
							</nav>
						</GridItem>
						<GridItem cols={12} lg={9}>
							{sections.map((section, i) => (
								<section
									key={section.slug}
									aria-labelledby={section.slug}
									className={i === 0 ? styles.firstSection : undefined}
								>
									<h2
										id={section.slug}
										dangerouslySetInnerHTML={{ __html: section.title }}
									/>
									<div dangerouslySetInnerHTML={{ __html: section.content }} />
								</section>
							))}
						</GridItem>
					</Grid>
				</GridItem>
			</Grid>
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		currentAboutPage: bnfAboutSection(id: { eq: $id }) {
			title
			sections {
				slug
				order
				title
				content
			}
		}
		allBnfAboutSection(sort: { fields: order }) {
			allAboutPages: nodes {
				id
				slug
				title
			}
		}
	}
`;

export default AboutDetailsPage;
