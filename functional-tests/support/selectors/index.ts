import commonSelectors from "./common";
import {
	path as searchPath,
	selectors as searchSelectors,
} from "./pages/search";

export type SelectorName =
	| keyof typeof commonSelectors
	| keyof typeof searchSelectors;

// Map of path regular expression to selectors
const pageMappings = [
	{
		path: searchPath,
		selectors: searchSelectors,
	},
];

export const getSelector = async (
	selectorName: SelectorName
): Promise<string> => {
	const browserPath = new URL(await browser.getUrl()).pathname,
		pageMapping = pageMappings.find(({ path }) => path === browserPath);

	const pageSelectors = pageMapping && pageMapping.selectors;

	const selectors = { ...commonSelectors, ...pageSelectors } as Record<
			SelectorName,
			string
		>,
		selector: string = selectors[selectorName];

	if (!selector)
		throw new Error(
			`No selector found with name ${selectorName} for page ${browserPath} or in common selectors`
		);

	return selector;
};
