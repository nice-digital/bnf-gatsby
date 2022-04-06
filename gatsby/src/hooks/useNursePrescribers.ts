import { useStaticQuery, graphql } from "gatsby";

import { SlugAndTitle, type MenuPageLink } from "@/utils";

export interface NursePrescribers {
	bnfNursePrescribersFormularyTreatmentSummary: SlugAndTitle[];
	bnfNursePrescribersFormularyIntroduction: SlugAndTitle[];
}

const slugToHref = ({ title, slug }: SlugAndTitle): MenuPageLink => ({
	title,
	href: `/nurse-prescribers-formulary/${slug}/`,
});

/**
 * Gets the lists of pages for the nurse prescribers formulary by combining:
 * - treatment summaries
 * - introduction
 * from the feed.
 *
 * @returns The consolidated list of about pages
 */
export const useNursePrescribers = (): MenuPageLink[] => {
	const {
		bnfNursePrescribersFormularyTreatmentSummary,
		bnfNursePrescribersFormularyIntroduction,
	} = useStaticQuery<NursePrescribers>(
		graphql`
			query NursePrescribers {
				bnfNursePrescribersFormularyTreatmentSummary {
					title
					slug
				}
				bnfNursePrescribersFormularyIntroduction {
					title
					slug
				}
			}
		`
	);

	return [
		...bnfNursePrescribersFormularyTreatmentSummary.map(slugToHref),
		...bnfNursePrescribersFormularyIntroduction.map(slugToHref),
	];
};
