const isBNF = process.env.GATSBY_SITE === "bnf";

module.exports = {
	siteMetadata: {
		siteUrl: isBNF ? "https://bnf.nice.org.uk" : "https://bnfc.nice.org.uk",
		title: "BNF and BNFC",
	},
	plugins: [
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