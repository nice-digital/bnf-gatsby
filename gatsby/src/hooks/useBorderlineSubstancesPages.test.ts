import { useStaticQuery } from "gatsby";

import {
	useBorderlineSubstancesPages,
	type BorderlineSubstancesQueryResult,
} from "./useBorderlineSubstancesPages";

// Export this mock data so we can use it elsewhere
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
					slug: "child-1",
					title: "Child 1",
					parentTaxonomy: {
						id: "PHP123",
					},
				},
				{
					slug: "child-2",
					title: "Child 2",
					parentTaxonomy: {
						id: "PHP123",
					},
				},
				{
					slug: "parent-2",
					title: "Parent 2",
					parentTaxonomy: null,
				},
				{
					slug: "child-1",
					title: "Child 1",
					parentTaxonomy: {
						id: "PHP124",
					},
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
