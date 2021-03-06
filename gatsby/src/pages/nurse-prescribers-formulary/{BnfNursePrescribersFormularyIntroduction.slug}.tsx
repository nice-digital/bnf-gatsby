import { graphql } from "gatsby";
import React, { FC } from "react";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { NursePrescribersFormularyMenu } from "@/components/NursePrescribersFormularyMenu/NursePrescribersFormularyMenu";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { MetaDescriptionsMap, SlugAndTitle, type RecordSection } from "@/utils";

import metas from "./{BnfNursePrescribersFormularyIntroduction.slug}.meta-descriptions.json";

export type NursePrescribersFormularyApprovedListPageProps = {
	data: {
		bnfNursePrescribersFormularyIntroduction: SlugAndTitle & {
			sections: RecordSection[];
		};
	};
	location: {
		pathname: string;
	};
};

const NursePrescribersFormularyApprovedListPage: FC<
	NursePrescribersFormularyApprovedListPageProps
> = ({
	data: {
		bnfNursePrescribersFormularyIntroduction: { title, sections, slug },
	},
	location: { pathname },
}) => {
	const { isBNF } = useSiteMetadata(),
		metaDescription = (metas as MetaDescriptionsMap)[slug]?.[
			isBNF ? "bnf" : "bnfc"
		];

	if (typeof metaDescription !== "string")
		throw new Error(
			`Couldn't find meta description for page '${title}' at path '${pathname}'. Has the page been added or renamed?`
		);

	return (
		<DetailsPageLayout
			titleHtml={title}
			parentTitleParts={["Nurse Prescribers' Formulary"]}
			menu={NursePrescribersFormularyMenu}
			asideContent={<></>}
			parentBreadcrumbs={[
				{
					href: "/nurse-prescribers-formulary/",
					text: "Nurse Prescribers' Formulary",
				},
			]}
			sections={sections.map(({ slug, title }) => ({
				id: slug,
				title,
			}))}
			metaDescription={metaDescription}
		>
			<RecordSectionsContent sections={sections} />
		</DetailsPageLayout>
	);
};

export const query = graphql`
	query {
		bnfNursePrescribersFormularyIntroduction {
			title
			slug
			sections {
				...RecordSection
			}
		}
	}
`;

export default NursePrescribersFormularyApprovedListPage;
