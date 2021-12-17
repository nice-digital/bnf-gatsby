module.exports = {
	// Monorepo set up so we're using sub projects with shared options
	projects: ["<rootDir>/gatsby"],
	preset: "ts-jest",
	collectCoverage: process.env.TEAMCITY_VERSION ? true : false,
	rootDir: "./",
	// collectCoverageFrom is global, until https://github.com/facebook/jest/pull/9633 is merged.
	// So it has to here in the root config rather than sub projects
	collectCoverageFrom: [
		"**/*.{js,ts,tsx}",
		"!**/.gatsby/**",
		"!**/public/**",
		"!**/*.d.ts",
		"!**/jest.config.js",
	],
	testResultsProcessor: "jest-teamcity-reporter",
	moduleFileExtensions: ["ts", "tsx", "js"],
	transform: {
		"^.+\\.(ts|tsx|js)$": "ts-jest",
	},
	clearMocks: true,
};
