require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

const isBNF = process.env.GATSBY_SITE === "bnf";

if (!process.env.GATSBY_SEARCH_URL)
	throw new Error(
		"Env var GATSBY_SEARCH_URL isn't set. Did you forget to add it?"
	);

module.exports = {
	jsxRuntime: "automatic",
	siteMetadata: {
		isBNF,
		siteUrl: `https://${isBNF ? "bnf" : "bnfc"}.nice.org.uk`,
		siteTitleShort: isBNF ? "BNF" : "BNFC",
		siteTitleLong:
			"British National Formulary" + (isBNF ? "" : " for Children"),
	},
	plugins: [
		{
			resolve: `gatsby-source-bnf`,
			options: {
				feedURL: process.env.FEED_URL,
				userKey: process.env.FEED_USER_KEY,
				site: isBNF ? "bnf" : "bnfc",
			},
		},
		// Avoid errors like "ModuleNotFoundError: Module not found: Error: Can't resolve '@/components/Layout/Layout'" when using custom paths in tsconfig.json
		`gatsby-plugin-tsconfig-paths`,
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				// Make CSS modules play nicely with TypeScript, see also global.d.ts for *.scss TS def
				cssLoaderOptions: {
					esModule: false,
					modules: {
						namedExport: false,
					},
				},
			},
		},
		"gatsby-plugin-catch-links",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-remove-generator",
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				excludes: [`/search/`],
			},
		},
		{
			resolve: "gatsby-plugin-google-tagmanager",
			options: {
				id: "GTM-5H5L9GK",
				includeInDevelopment: true,
			},
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				icon: "src/images/icon.png",
			},
		},
	],
};
