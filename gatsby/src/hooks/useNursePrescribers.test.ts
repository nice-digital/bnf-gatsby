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
				slug: "contraceptives-non-hormonal",
				title: "Contraceptives, non-hormonal",
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
	const nursePrescribers = useNursePrescribers();

	it("should return correct number of links", () => {
		expect(nursePrescribers).toHaveLength(4);
	});

	it("should prefix slugs with about section path", () => {
		expect(nursePrescribers[0]).toHaveProperty(
			"href",
			"/nurse-prescribers-formulary/analgesics/"
		);
	});

	it("should return pages from nurse prescribers feed section as first links in array", () => {
		expect(nursePrescribers[0]).toStrictEqual({
			title: "Analgesics",
			href: "/nurse-prescribers-formulary/analgesics/",
		});

		expect(nursePrescribers[1]).toStrictEqual({
			title: "Appliances and reagents for diabetes",
			href: "/nurse-prescribers-formulary/appliances-and-reagents-for-diabetes/",
		});
	});

	it("should return link to approved list page after about section links", () => {
		expect(nursePrescribers[3]).toStrictEqual({
			title:
				"Approved list for prescribing by Community Practitioner Nurse Prescribers (NPF)",
			href: "/nurse-prescribers-formulary/approved-list-for-prescribing-by-community-practitioner-nurse-prescribers-npf/",
		});
	});
});
