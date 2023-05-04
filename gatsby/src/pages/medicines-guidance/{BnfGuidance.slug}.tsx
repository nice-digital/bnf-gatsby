import { graphql } from "gatsby";
import React, { type FC } from "react";
import striptags from "striptags";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { MedicinesGuidanceMenu } from "@/components/MedicinesGuidanceMenu/MedicinesGuidanceMenu";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { NEWSEO } from "@/components/SEO/NEWSEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import {
	type SlugAndTitle,
	type RecordSection,
	type MetaDescriptionsMap,
} from "@/utils";

import metas from "./{BnfGuidance.slug}.meta-descriptions.json";

export type MedicinesGuidancePageProps = {
	data: {
		currentGuidancePage: SlugAndTitle & {
			sections: RecordSection[];
		};
	};
	location: {
		pathname: string;
	};
};

export function Head({
	data: { currentGuidancePage },
	location,
}: MedicinesGuidancePageProps): JSX.Element {
	const { slug, title } = currentGuidancePage;
	const titleNoHtml = striptags(title),
		/** The ancestors from the parent page e.g. ["About"] */
		parentTitleParts = ["Medicines guidance"];

	const { isBNF } = useSiteMetadata(),
		metaDescription = (metas as MetaDescriptionsMap)[slug]?.[
			isBNF ? "bnf" : "bnfc"
		];

	if (typeof metaDescription !== "string")
		throw new Error(
			`Couldn't find meta description for page '${title}' at path '${location.pathname}'. Has the page been added or renamed?`
		);

	return (
		<NEWSEO
			title={[titleNoHtml, ...parentTitleParts].filter(Boolean).join(" | ")}
			description={metaDescription}
		/>
	);
}

const MedicinesGuidancePage: FC<MedicinesGuidancePageProps> = ({
	data: {
		currentGuidancePage: { title, sections },
	},
}) => {
	return (
		<DetailsPageLayout
			titleHtml={title}
			parentBreadcrumbs={[
				{ href: "/medicines-guidance/", text: "Medicines guidance" },
			]}
			menu={MedicinesGuidanceMenu}
			sections={sections.map(({ slug, title }) => ({
				id: slug,
				title,
			}))}
		>
			<RecordSectionsContent sections={sections} />
		</DetailsPageLayout>
	);
};

export const query = graphql`
	query ($id: String) {
		currentGuidancePage: bnfGuidance(id: { eq: $id }) {
			slug
			title
			sections {
				...RecordSection
			}
		}
	}
`;

export default MedicinesGuidancePage;
