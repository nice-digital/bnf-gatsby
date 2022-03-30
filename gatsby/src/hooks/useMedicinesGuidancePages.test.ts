import { useStaticQuery } from "gatsby";

import {
	useMedicinesGuidancePages,
	type MedicinesGuidanceQueryResult,
} from "./useMedicinesGuidancePages";

export const mockQueryData: MedicinesGuidanceQueryResult = {
	allBnfGuidance: {
		pages: [
			{
				slug: "guidance-on-prescribing",
				title: "Guidance on prescribing",
			},
			{
				slug: "prescription-writing",
				title: "Prescription writing",
			},
		],
	},
};

(useStaticQuery as jest.Mock).mockReturnValue(mockQueryData);

describe("useMedicinesGuidancePages", () => {
	const medicinesGuidancePages = useMedicinesGuidancePages();

	it("should return correct number of links", () => {
		expect(medicinesGuidancePages).toHaveLength(2);
	});

	it("should prefix slugs with medicines guidance section path", () => {
		expect(medicinesGuidancePages[0]).toHaveProperty(
			"href",
			"/medicines-guidance/guidance-on-prescribing/"
		);
	});

	it("should return correct titles and paths", () => {
		expect(medicinesGuidancePages).toStrictEqual([
			{
				href: "/medicines-guidance/guidance-on-prescribing/",
				title: "Guidance on prescribing",
			},
			{
				href: "/medicines-guidance/prescription-writing/",
				title: "Prescription writing",
			},
		]);
	});
});
