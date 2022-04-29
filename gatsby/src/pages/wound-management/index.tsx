import { graphql, Link } from "gatsby";
import React, { type FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";

import { Layout } from "@/components/Layout/Layout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import {
	SectionNav,
	type SectionNavProps,
} from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { type RecordSection } from "@/utils";

import styles from "./index.module.scss";

export type WoundManagementIndexPageProps = {
	data: {
		bnfWoundManagementIntroduction: {
			title: string;
			sections: RecordSection[];
		} | null;
		allBnfWoundManagementTaxonomy: {
			taxonomies: {
				title: string;
				slug: string;
			}[];
		};
	};
};

const navSections: SectionNavProps = {
	sections: [
		{
			title: "Introduction",
			id: "introduction",
		},
		{
			title: "Pink (epitheliasing)",
			id: "wound-type--154124684",
		},
		{
			title: "Red (granulating)",
			id: "wound-type-1889862293",
		},
		{
			title: "Yellow (sloughy)(granulating)",
			id: "wound-type-102222233",
		},
		{
			title: "Black (Necrotic/ Eschar)",
			id: "wound-type-530708321",
		},
		{
			title: "Wounds with signs of infection",
			id: "wound-type-592109193",
		},
	],
};

const WoundManagementIndexPage: FC<WoundManagementIndexPageProps> = ({
	data: {
		bnfWoundManagementIntroduction,
		allBnfWoundManagementTaxonomy: { taxonomies },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata();
	// There is no wound management section for BNFC so return null but also the page will get deleted in gatsby-node
	if (!bnfWoundManagementIntroduction) return null;

	const { title, sections } = bnfWoundManagementIntroduction;

	return (
		<Layout>
			<SEO
				title={title}
				description="Browse wound management products and elasticated garments, by type."
			/>

			<Breadcrumbs>
				<Breadcrumb key="NICE" to="https://www.nice.org.uk/">
					NICE
				</Breadcrumb>
				<Breadcrumb key="Home" to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb key="Current page">{title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader id="content-start" heading={title} />
			<Grid gutter="loose" data-testid="body">
				<GridItem cols={12} md={4} lg={3} className="hide-print">
					<StackedNav
						aria-label="Wound management product pages"
						label="Wound management products"
						link={{ destination: "/wound-management/", elementType: Link }}
					>
						{taxonomies.map(({ slug, title }) => (
							<StackedNavLink
								key={slug}
								destination={`/wound-management/${slug}`}
								elementType={Link}
							>
								<span dangerouslySetInnerHTML={{ __html: title }} />
							</StackedNavLink>
						))}
					</StackedNav>
				</GridItem>
				<GridItem cols={12} md={8} lg={9}>
					<SectionNav {...navSections} />
					<RecordSectionsContent
						sections={sections}
						className={styles.woundManagementIndex}
					/>
				</GridItem>
			</Grid>
		</Layout>
	);
};

export const query = graphql`
	{
		bnfWoundManagementIntroduction {
			title
			sections {
				...RecordSection
			}
		}
		allBnfWoundManagementTaxonomy(
			filter: { parentTaxonomy: { title: { eq: null } } }
		) {
			taxonomies: nodes {
				title
				slug
			}
		}
	}
`;

export default WoundManagementIndexPage;
