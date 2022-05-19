import { useStaticQuery } from "gatsby";

import {
	useBorderlineSubstancesPages,
	type BorderlineSubstancesQueryResult,
} from "./useBorderlineSubstancesPages";

export const mockBorderlineSubstancesPagesQueryData: BorderlineSubstancesQueryResult =
	{
		allBnfBorderlineSubstancesTaxonomyRoot: {
			nodes: [
				{
					taxonomy: {
						slug: "enteral-feeds-non-disease-specific",
						title: "Enteral feeds (non-disease specific)",
					},
				},
				{
					taxonomy: {
						slug: "specialised-formulas",
						title: "Specialised formulas",
					},
				},
				{
					taxonomy: {
						slug: "foods-for-special-diets",
						title: "Foods for special diets",
					},
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
			"/borderline-substances/enteral-feeds-non-disease-specific/"
		);
	});
});
