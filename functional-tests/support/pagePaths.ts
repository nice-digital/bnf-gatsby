export const pagePaths = {
	home: "/",
	guidance: "/guidance/",
	"Dental Practitioners’ Formulary": "/dental-practitioners-formulary/",
	// About
	about: "/about/",
	changes: "/about/changes/",
	labels: "/about/labels/",
	"guidance for cautionary and advisory labels":
		"/about/guidance-for-cautionary-and-advisory-labels/",
	"abbreviations and symbols": "/about/abbreviations-and-symbols/",
	"approximate conversions and units":
		"/about/approximate-conversions-and-units/",
	"drugs A to Z": "/drugs/",
	"interactions A to Z": "/interactions/",
	"treatment summaries A to Z": "/treatment-summaries/",
	"abacavir interactions": "/interactions/abacavir/",
	"abacavir drug": "/drugs/abacavir/",
	"co-codamol drug": "/drugs/co-codamol/",
	"abacavir medicinal forms": "/drugs/abacavir/medicinal-forms/",
	"dementia treatment summary": "/treatment-summaries/dementia/",
	"medicines guidance": "/medicines-guidance/",
	// Medicines guidance
	"guidance on prescribing": "/medicines-guidance/guidance-on-prescribing/",
	"prescription writing": "/medicines-guidance/prescription-writing/",
	"prescribing in dental practice":
		"/medicines-guidance/prescribing-in-dental-practice/",
} as const;

export type PageName = keyof typeof pagePaths;

export const getPath = (pageName: PageName): string => {
	const path = pagePaths[pageName];

	if (!path) throw `Path for page ${pageName} could not be resolved`;

	return path;
};
