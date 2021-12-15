const isBNF = process.env.GATSBY_SITE === "bnf";

module.exports = {
	siteMetadata: {
		isBNF,
		siteUrl: `https://${isBNF ? "bnf" : "bnfc"}.nice.org.uk`,
		siteTitleShort: isBNF ? "BNF" : "BNFC",
		siteTitleLong:
			"British National Formulary" + (isBNF ? "" : " for Children"),
	},
	plugins: [
		`gatsby-source-bnf`,
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
