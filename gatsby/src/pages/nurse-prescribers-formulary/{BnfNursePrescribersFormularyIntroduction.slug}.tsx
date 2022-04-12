import { graphql } from "gatsby";
import React, { FC } from "react";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { NursePrescribersFormularyMenu } from "@/components/NursePrescribersFormularyMenu/NursePrescribersFormularyMenu";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { type RecordSection } from "@/utils";

export type NursePrescribersFormularyIntroductionPageProps = {
	data: {
		bnfNursePrescribersFormularyIntroduction: {
			title: string;
			sections: RecordSection[];
		};
	};
};

const NursePrescribersFormularyIntroductionPage: FC<
	NursePrescribersFormularyIntroductionPageProps
> = ({
	data: {
		bnfNursePrescribersFormularyIntroduction: { title, sections },
	},
}) => {
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
		>
			<RecordSectionsContent sections={sections} />
		</DetailsPageLayout>
	);
};

export const query = graphql`
	query {
		bnfNursePrescribersFormularyIntroduction {
			title
			sections {
				...RecordSection
			}
		}
	}
`;

export default NursePrescribersFormularyIntroductionPage;