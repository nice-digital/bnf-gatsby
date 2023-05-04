import { graphql } from "gatsby";
import React, { type FC } from "react";
import striptags from "striptags";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { NEWSEO } from "@/components/SEO/NEWSEO";
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

export function Head({
	data: { bnfDentalPractitionersFormulary },
}: DentalPractitionersFormularyPageProps): JSX.Element {
	const { title } = bnfDentalPractitionersFormulary,
		titleNoHtml = striptags(title),
		{ siteTitleShort } = useSiteMetadata();

	return (
		<NEWSEO
			title={titleNoHtml}
			description={`Browse the Dental Practitioners' Formulary (DPF) - the list of approved preparations for prescribing by dentists in the ${siteTitleShort}.`}
		/>
	);
}

const DentalPractitionersFormularyPage: FC<
	DentalPractitionersFormularyPageProps
> = ({
	data: {
		bnfDentalPractitionersFormulary: { title, sections },
	},
}) => {
	return (
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
