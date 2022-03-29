import { graphql } from "gatsby";
import React, { type FC } from "react";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { MedicinesGuidanceMenu } from "@/components/MedicinesGuidanceMenu/MedicinesGuidanceMenu";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
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

const MedicinesGuidancePage: FC<MedicinesGuidancePageProps> = ({
	data: {
		currentGuidancePage: { slug, title, sections },
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
			metaDescription={metaDescription}
			parentTitleParts={["Medicines guidance"]}
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
