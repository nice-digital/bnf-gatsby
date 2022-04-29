import { useStaticQuery } from "gatsby";

import {
	useNursePrescribers,
	type NursePrescribers,
} from "./useNursePrescribers";

// Export this mock data so we can use it elsewhere
export const mockNursePrescribersPagesQueryData: NursePrescribers = {
	allBnfNursePrescribersFormularyTreatmentSummary: {
		summaries: [
			{
				slug: "analgesics",
				title: "Analgesics",
			},
			{
				slug: "appliances-and-reagents-for-diabetes",
				title: "Appliances and reagents for diabetes",
			},
			{
				slug: "general-guidance",
				title: "General guidance",
			},
		],
	},
	allBnfNursePrescribersFormularyIntroduction: {
		introduction: [
			{
				slug: "approved-list-for-prescribing-by-community-practitioner-nurse-prescribers-npf",
				title:
					"Approved list for prescribing by Community Practitioner Nurse Prescribers (NPF)",
			},
		],
	},
};

(useStaticQuery as jest.Mock).mockReturnValue(
	mockNursePrescribersPagesQueryData
);

describe("useNursePrescribers", () => {
	const { menuList, aboutList, treatmentSummariesList } = useNursePrescribers();

	it("should return correct number of links for the menu", () => {
		expect(menuList).toHaveLength(4);
	});

	it("should return two links for the about section", () => {
		expect(aboutList).toHaveLength(2);
	});

	it("should return correct number of treatment summaries links", () => {
		expect(treatmentSummariesList).toHaveLength(3);
	});

	it("should prefix slugs with nurse prescribers formulary section path", () => {
		expect(menuList[0]).toHaveProperty(
			"href",
			"/nurse-prescribers-formulary/analgesics/"
		);
	});

	it("should return pages from nurse prescribers feed section as first links in array", () => {
		expect(menuList[0]).toStrictEqual({
			title: "Analgesics",
			href: "/nurse-prescribers-formulary/analgesics/",
		});

		expect(menuList[1]).toStrictEqual({
			title: "Appliances and reagents for diabetes",
			href: "/nurse-prescribers-formulary/appliances-and-reagents-for-diabetes/",
		});
	});

	it("should return link to approved list page after treatment summary links for the menu", () => {
		expect(menuList[3]).toStrictEqual({
			title:
				"Approved list for prescribing by Community Practitioner Nurse Prescribers (NPF)",
			href: "/nurse-prescribers-formulary/approved-list-for-prescribing-by-community-practitioner-nurse-prescribers-npf/",
		});
	});
});
