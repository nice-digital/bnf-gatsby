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
 * @returns both the consolidated list for the details page menu, and two separate lists for the index page.
 */
export const useNursePrescribers = (): {
	menuList: MenuPageLink[];
	aboutList: MenuPageLink[];
	treatmentSummariesList: MenuPageLink[];
} => {
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

	const menuList = [
		...allBnfNursePrescribersFormularyTreatmentSummary.summaries.map(
			slugToHref
		),
		...allBnfNursePrescribersFormularyIntroduction.introduction.map(slugToHref),
	];

	const aboutList = [
		...allBnfNursePrescribersFormularyTreatmentSummary.summaries
			.filter((summary) => summary.slug == "general-guidance")
			.map(slugToHref),
		...allBnfNursePrescribersFormularyIntroduction.introduction.map(slugToHref),
	];

	const treatmentSummariesList = [
		...allBnfNursePrescribersFormularyTreatmentSummary.summaries.map(
			slugToHref
		),
	];

	return { menuList, aboutList, treatmentSummariesList };
};
