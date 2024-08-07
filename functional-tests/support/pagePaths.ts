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
	"acne treatment summary": "/treatment-summaries/acne/",
	"abemaciclib medicinal forms": "/drugs/abemaciclib/medicinal-forms/",
	"co-codamol medicinal forms": "/drugs/co-codamol/medicinal-forms/",
	"galantamine medicinal forms": "/drugs/galantamine/medicinal-forms/",
	"dementia treatment summary": "/treatment-summaries/dementia/",
	"diabetes treatment summary": "/treatment-summaries/diabetes/",
	"medicines guidance": "/medicines-guidance/",
	// Medical devices
	"medical devices": "/medical-devices/",
	"artificial saliva products": "/medical-devices/artificial-saliva-products/",
	"AS Saliva Orthana® lozenges":
		"/medical-devices/artificial-saliva-products/as-saliva-orthana-lozenges/",
	spacers: "/medical-devices/spacers/",
	"urine protein testing strips":
		"/medical-devices/urine-protein-testing-strips/urine-protein-testing-strips/",
	// Wound management
	"wound management": "/wound-management",
	"advanced wound dressings": "/wound-management/advanced-wound-dressings/",
	"antimicrobial dressings": "/wound-management/antimicrobial-dressings/",
	"complex adjunct therapies": "/wound-management/complex-adjunct-therapies/",
	bandages: "/wound-management/bandages/",
	"odour absorbent dressings":
		"/wound-management/advanced-wound-dressings/odour-absorbent-dressings/",
	"protease-modulating matrix dressings":
		"/wound-management/specialised-dressings/protease-modulating-matrix-dressings/",
	"medicated bandages": "/wound-management/bandages/medicated-bandages/",
	// Medicines guidance
	"guidance on prescribing": "/medicines-guidance/guidance-on-prescribing/",
	"prescription writing": "/medicines-guidance/prescription-writing/",
	"prescribing in dental practice":
		"/medicines-guidance/prescribing-in-dental-practice/",
	"nurse prescribers formulary": "/nurse-prescribers-formulary/",
	laxatives: "/nurse-prescribers-formulary/laxatives/",
	"general guidance": "/nurse-prescribers-formulary/general-guidance/",
	"local anaesthetics": "/nurse-prescribers-formulary/local-anaesthetics/",
	// Borderline substances
	"borderline substances": "/borderline-substances/",
	"cystic fibrosis":
		"/borderline-substances/vitamin-and-mineral-supplements/cystic-fibrosis/",
	"flavour additives": "/borderline-substances/flavour-additives/",
	"flavour additive powders":
		"/borderline-substances/flavour-additives/flavour-additive-powders/",
	"vitamin and mineral supplements":
		"/borderline-substances/vitamin-and-mineral-supplements/",

	search: "/search/",
} as const;

export type PageName = keyof typeof pagePaths;

export const getPath = (pageName: PageName): string => {
	const path = pagePaths[pageName];

	if (!path) throw `Path for page ${pageName} could not be resolved`;

	return path;
};
