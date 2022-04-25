import { graphql, Link } from "gatsby";
import React, { type FC } from "react";

import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { type RecordSection } from "@/utils";

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

const WoundManagementIndexPage: FC<WoundManagementIndexPageProps> = ({
	data: {
		bnfWoundManagementIntroduction,
		allBnfWoundManagementTaxonomy: { taxonomies },
	},
}) => {
	// There is no wound management section for BNFC so return null but also the page will get deleted in gatsby-node
	if (!bnfWoundManagementIntroduction) return null;

	const { title, sections } = bnfWoundManagementIntroduction;

	const menu: FC = () => (
		<StackedNav
			aria-label="Wound management product pages"
			label="Wound management products"
			link={{ destination: "/wound-management/", elementType: Link }}
		>
			{taxonomies.map(({ slug, title }) => (
				<StackedNavLink
					key={slug}
					destination={`/wound-management/{slug}`}
					elementType={Link}
				>
					<span dangerouslySetInnerHTML={{ __html: title }} />
				</StackedNavLink>
			))}
		</StackedNav>
	);

	return (
		<DetailsPageLayout
			titleHtml={title}
			sections={sections.map(({ slug, title }) => ({
				id: slug,
				title,
			}))}
			menu={menu}
			useSectionNav={true}
		>
			<RecordSectionsContent sections={sections} />
		</DetailsPageLayout>
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
