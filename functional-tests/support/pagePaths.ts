export const pagePaths = {
	home: "/",
} as const;

export type PageName = keyof typeof pagePaths;

export const getPath = (pageName: PageName): string => {
	const path = pagePaths[pageName];

	if (!path) throw `Path for page ${pageName} could not be resolved`;

	return path;
};
