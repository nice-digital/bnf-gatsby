import { graphql } from "gatsby";
import React, { type FC } from "react";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";

import { type RecordSection } from "../../types";

export type DentalPractitionersFormularyPageProps = {
	data: {
		bnfDentalPractitionersFormulary: {
			title: string;
			sections: RecordSection[];
		};
	};
};

const DentalPractitionersFormularyPage: FC<
	DentalPractitionersFormularyPageProps
> = ({
	data: {
		bnfDentalPractitionersFormulary: { title, sections },
	},
}) => (
	<DetailsPageLayout
		titleHtml={title}
		sections={sections.map(({ slug, title }) => ({
			id: slug,
			title,
		}))}
	>
		<RecordSectionsContent sections={sections} />
	</DetailsPageLayout>
);

export const query = graphql`
	{
		bnfDentalPractitionersFormulary {
			title
			sections {
				...RecordSection
			}
		}
	}
`;

export default DentalPractitionersFormularyPage;
