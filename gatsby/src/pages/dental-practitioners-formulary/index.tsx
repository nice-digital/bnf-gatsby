import { graphql } from "gatsby";
import React, { type FC } from "react";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { type RecordSection } from "@/utils";

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
}) => {
	const { siteTitleShort } = useSiteMetadata(),
		metaDescription = `Browse the Dental Practitioners' Formulary (DPF) - the list of approved preparations for prescribing by dentists in the ${siteTitleShort}.`;

	return (
		<DetailsPageLayout
			titleHtml={title}
			metaDescription={metaDescription}
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
