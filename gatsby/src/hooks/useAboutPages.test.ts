import { useStaticQuery } from "gatsby";

import { useAboutPages, type AboutPages } from "./useAboutPages";

// Export this mock data so we can use it elsewhere
export const mockAboutPagesQueryData: AboutPages = {
	allBnfAboutSection: {
		aboutSectionPages: [
			{
				slug: "changes",
				title: "Changes",
			},
			{
				slug: "publication-information",
				title: "Publication <i>information</i>",
			},
		],
	},
	allBnfCautionaryAndAdvisoryGuidance: {
		labelsGuidancePages: [
			{
				slug: "guidance-for-cautionary-and-advisory-labels",
				title: "Guidance for cautionary and advisory labels",
			},
		],
	},
};

(useStaticQuery as jest.Mock).mockReturnValue(mockAboutPagesQueryData);

describe("useAboutPages", () => {
	const aboutPages = useAboutPages();

	it("should return correct number of links", () => {
		expect(aboutPages).toHaveLength(4);
	});

	it("should prefix slugs with about section path", () => {
		expect(aboutPages[0]).toHaveProperty("href", "/about/changes/");
	});

	it("should return pages from about feed section as first links in array", () => {
		expect(aboutPages[0]).toStrictEqual({
			title: "Changes",
			href: "/about/changes/",
		});

		expect(aboutPages[1]).toStrictEqual({
			title: "Publication <i>information</i>",
			href: "/about/publication-information/",
		});
	});

	it("should return link to labels page after about section links", () => {
		expect(aboutPages[2]).toStrictEqual({
			title: "Labels",
			href: "/about/labels/",
		});
	});

	it("should return link to cautionary guidance page(s) at end", () => {
		expect(aboutPages[3]).toStrictEqual({
			title: "Guidance for cautionary and advisory labels",
			href: "/about/guidance-for-cautionary-and-advisory-labels/",
		});
	});
});
