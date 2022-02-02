require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

const isBNF = process.env.GATSBY_SITE === "bnf";
const searchUrl = process.env.GATSBY_SEARCH_URL;

module.exports = {
	jsxRuntime: "automatic",
	siteMetadata: {
		isBNF,
		siteUrl: `https://${isBNF ? "bnf" : "bnfc"}.nice.org.uk`,
		searchUrl,
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
		"gatsby-plugin-sitemap",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				icon: "src/images/icon.png",
			},
		},
	],
};
