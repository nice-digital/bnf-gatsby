import { useStaticQuery, graphql } from "gatsby";

import { type MenuPageLink, type SlugAndTitle } from "@/utils";

export interface MedicalDevicesQueryResult {
	allBnfMedicalDevice: {
		pages: SlugAndTitle[];
	};
}

const slugToHref = ({ title, slug }: SlugAndTitle): MenuPageLink => ({
	title,
	href: `/medical-devices/${slug}/`,
});

/**
 * Gets the lists of pages for the medical devices section
 *
 * @returns The consolidated list of medical devices pages
 */
export const useMedicalDevicePages = (): MenuPageLink[] => {
	const { allBnfMedicalDevice } = useStaticQuery<MedicalDevicesQueryResult>(
		graphql`
			{
				allBnfMedicalDevice(sort: { fields: title, order: ASC }) {
					pages: nodes {
						slug
						title
					}
				}
			}
		`
	);

	return allBnfMedicalDevice.pages.map(slugToHref);
};
