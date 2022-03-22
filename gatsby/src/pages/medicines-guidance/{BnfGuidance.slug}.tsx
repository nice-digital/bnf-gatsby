import { graphql } from "gatsby";
import React, { type FC } from "react";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { type RecordSection } from "@/utils";

export type AboutSectionPageProps = {
	data: {
		currentGuidancePage: {
			title: string;
			sections: RecordSection[];
		};
	};
	location: {
		pathname: string;
	};
};

const GuidancePage: FC<AboutSectionPageProps> = ({
	data: {
		currentGuidancePage: { title, sections },
	},
}) => {
	return (
		<DetailsPageLayout
			titleHtml={title}
			parentTitleParts={["Medicines guidance"]}
			parentBreadcrumbs={[
				{ href: "/medicines-guidance/", text: "Medicines guidance" },
			]}
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
			title
			sections {
				...RecordSection
			}
		}
	}
`;

export default GuidancePage;
