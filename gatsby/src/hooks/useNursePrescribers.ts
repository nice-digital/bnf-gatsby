import { useStaticQuery, graphql } from "gatsby";

import { SlugAndTitle, type MenuPageLink } from "@/utils";

export interface NursePrescribers {
	allBnfNursePrescribersFormularyIntroduction: {
		introduction: SlugAndTitle[];
	};
	allBnfNursePrescribersFormularyTreatmentSummary: {
		summaries: SlugAndTitle[];
	};
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
		allBnfNursePrescribersFormularyIntroduction,
		allBnfNursePrescribersFormularyTreatmentSummary,
	} = useStaticQuery<NursePrescribers>(
		graphql`
			query NursePrescribers {
				allBnfNursePrescribersFormularyIntroduction {
					introduction: nodes {
						slug
						title
					}
				}
				allBnfNursePrescribersFormularyTreatmentSummary {
					summaries: nodes {
						slug
						title
					}
				}
			}
		`
	);

	return [
		...allBnfNursePrescribersFormularyTreatmentSummary.summaries.map(
			slugToHref
		),
		...allBnfNursePrescribersFormularyIntroduction.introduction.map(slugToHref),
	];
};
