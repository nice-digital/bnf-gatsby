const { NODE_ENV, GATSBY_SITE, FEED_URL: feedURL } = process.env;

const isBNF = GATSBY_SITE === "bnf";

require("dotenv").config({
	path: `.env.${NODE_ENV}`,
});

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
				feedURL,
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
