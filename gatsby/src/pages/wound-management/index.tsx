import { graphql, Link } from "gatsby";
import React, { type FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Menu } from "@/components/Menu/Menu";
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
		allBnfWoundManagementTaxonomyRoot: {
			taxonomies: {
				taxonomy: {
					title: string;
					slug: string;
				};
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
			title: "PINK (epitheliasing)",
			id: "wound-type--154124684",
		},
		{
			title: "RED (granulating)",
			id: "wound-type-1889862293",
		},
		{
			title: "YELLOW (sloughy)(granulating)",
			id: "wound-type-102222233",
		},
		{
			title: "BLACK (Necrotic/ Eschar)",
			id: "wound-type-530708321",
		},
		{
			title: "Wounds with signs of infection",
			id: "wound-type--977151263",
		},
	],
};

const WoundManagementIndexPage: FC<WoundManagementIndexPageProps> = ({
	data: {
		bnfWoundManagementIntroduction,
		allBnfWoundManagementTaxonomyRoot: { taxonomies },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata();
	// There is no wound management section for BNFC so return null but also the page will get deleted in gatsby-node
	if (!bnfWoundManagementIntroduction) return null;

	const { title, sections } = bnfWoundManagementIntroduction;

	return (
		<>
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
					<Menu
						label="Wound management products"
						link={{
							destination: "/wound-management/",
							elementType: Link,
							isCurrent: true,
						}}
						pages={taxonomies.map(({ taxonomy: { slug, title } }) => ({
							href: `/wound-management/${slug}/`,
							title,
						}))}
					></Menu>
				</GridItem>
				<GridItem cols={12} md={8} lg={9}>
					<SectionNav {...navSections} />
					<RecordSectionsContent
						sections={sections}
						className={styles.woundManagementIndex}
					/>
				</GridItem>
			</Grid>
		</>
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
		allBnfWoundManagementTaxonomyRoot {
			taxonomies: nodes {
				taxonomy {
					title
					slug
				}
			}
		}
	}
`;

export default WoundManagementIndexPage;
