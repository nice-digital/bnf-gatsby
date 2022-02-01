export const pagePaths = {
	home: "/",
	guidance: "/guidance/",
	// About
	about: "/about/",
	changes: "/about/changes/",
	labels: "/about/labels/",
	"guidance for cautionary and advisory labels":
		"/about/about/guidance-for-cautionary-and-advisory-labels/",
	"abbreviations and symbols": "/about/abbreviations-and-symbols/",
	"approximate conversions and units":
		"/about/approximate-conversions-and-units/",
} as const;

export type PageName = keyof typeof pagePaths;

export const getPath = (pageName: PageName): string => {
	const path = pagePaths[pageName];

	if (!path) throw `Path for page ${pageName} could not be resolved`;

	return path;
};
