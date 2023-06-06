const { pathsToModuleNameMapper } = require("ts-jest");

const baseConfig = require("./../jest.config"),
	{ compilerOptions } = require("./tsconfig.json");

// Translation of TypeScript path mappings to jest paths: https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping
const tsPathsModuleNameMappings = pathsToModuleNameMapper(
	compilerOptions.paths,
	{ prefix: "<rootDir>/" }
);

module.exports = {
	// Extend the base config from the root as it's got shared/common config
	...baseConfig,
	displayName: "gatsby",
	rootDir: "./",
	roots: ["<rootDir>"],
	projects: undefined,
	moduleNameMapper: {
		"\\.(css|scss)$": "identity-obj-proxy",
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/fileMock.js",
		// Alias React/Next into the gatsby folder because of our monorepo setup.
		// Avoids errors like "multiple instances of React" with hooks
		"^react(.*)$": "<rootDir>/node_modules/react$1",
		"^gatsby(.*)$": "<rootDir>/node_modules/gatsby$1",
		// See https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/#reach-router
		"^@reach/router(.*)": "<rootDir>/node_modules/@gatsbyjs/reach-router$1",
		// Jest is complaining about ESM modules, so we'll use the CJS equivalents instead
		"@mantine/hooks/esm/use-focus-trap/use-focus-trap":
			"@mantine/hooks/cjs/use-focus-trap/use-focus-trap",
		"@mantine/hooks/esm/use-debounced-value/use-debounced-value":
			"@mantine/hooks/cjs/use-debounced-value/use-debounced-value",
		// Aliases to match paths in tsconfig.json
		...tsPathsModuleNameMappings,
	},
	transformIgnorePatterns: ["/node_modules/", "/dist/"],
	setupFilesAfterEnv: ["./src/jest.setup.ts", "jest-extended/all"],
	testPathIgnorePatterns: ["./config/"],
	testEnvironmentOptions: {
		url: "https://bnf-gatsby-tests.nice.org.uk",
	},
	testEnvironment: "jsdom",
	globals: {
		"ts-jest": {
			tsconfig: {
				...compilerOptions,
				// To avoid errors like "Class constructor App cannot be invoked without 'new'"
				target: "ESNext",
				jsx: "react-jsxdev",
			},
		},
	},
};
