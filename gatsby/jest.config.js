const { pathsToModuleNameMapper } = require("ts-jest");

const baseConfig = require("./../jest.config"),
	{ compilerOptions } = require("./tsconfig.json");

// Translation of TypeScript path mappings to jest paths: https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping
const tsPathsModuleNameMappings = pathsToModuleNameMapper(
	compilerOptions.paths,
	{ prefix: "<rootDir>/../" }
);

module.exports = {
	// Extend the base config from the root as it's got shared/common config
	...baseConfig,
	displayName: "gatsby",
	rootDir: "./",
	roots: ["<rootDir>"],
	projects: undefined,
	moduleNameMapper: {
		"\\.(css|scss|svg)$": "identity-obj-proxy",
		// Alias React/Next into the gatsby folder because of our monorepo setup.
		// Avoids errors like "multiple instances of React" with hooks
		"^react(.*)$": "<rootDir>/node_modules/react$1",
		"^gatsby(.*)$": "<rootDir>/node_modules/gatsby$1",
		// Aliases to match paths in tsconfig.json
		...tsPathsModuleNameMappings,
	},
	transformIgnorePatterns: ["/node_modules/", "/dist/"],
	setupFilesAfterEnv: ["./src/jest.setup.ts"],
	testPathIgnorePatterns: ["./config/"],
	testURL: "https://bnf-gatsby-tests.nice.org.uk",
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
