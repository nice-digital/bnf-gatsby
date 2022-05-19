import { useStaticQuery } from "gatsby";

import {
	useBorderlineSubstancesPages,
	type BorderlineSubstancesQueryResult,
} from "./useBorderlineSubstancesPages";

export const mockBorderlineSubstancesPagesQueryData: BorderlineSubstancesQueryResult =
	{
		allBnfBorderlineSubstancesTaxonomy: {
			pages: [
				{
					slug: "parent-1",
					title: "Parent 1",
					parentTaxonomy: null,
				},
				{
					slug: "parent-2",
					title: "Parent 2",
					parentTaxonomy: null,
				},
				{
					slug: "parent-3",
					title: "Parent 3",
					parentTaxonomy: null,
				},
			],
		},
	};

(useStaticQuery as jest.Mock).mockReturnValue(
	mockBorderlineSubstancesPagesQueryData
);

describe("useBorderlineSubstancesPages", () => {
	const borderlineSubstancesPages = useBorderlineSubstancesPages();

	it("should return correct number of links", () => {
		expect(borderlineSubstancesPages).toHaveLength(3);
	});

	it("should prefix slugs with about section path", () => {
		expect(borderlineSubstancesPages[0]).toHaveProperty(
			"href",
			"/borderline-substances/parent-1/"
		);
	});
});
