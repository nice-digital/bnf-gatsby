const { createProxyMiddleware } = require("http-proxy-middleware");
require("source-map-support").install();
require("ts-node/register/transpile-only");

require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

const isBNF = process.env.GATSBY_SITE === "bnf";
const searchUrl = process.env.GATSBY_SEARCH_URL;

if (process.env.NODE_ENV && !process.env.GATSBY_SEARCH_URL)
	throw new Error(
		"Env var GATSBY_SEARCH_URL isn't set. Did you forget to add it?"
	);

const siteUrl =
		process.env.NODE_ENV === "development"
			? "http://localhost:8000"
			: `https://${isBNF ? "bnf" : "bnfc"}.nice.org.uk`,
	siteTitleShort = isBNF ? "BNF" : "BNFC",
	siteTitleLong = "British National Formulary" + (isBNF ? "" : " for Children");

module.exports = {
	jsxRuntime: "automatic",
	siteMetadata: {
		isBNF,
		siteUrl,
		searchUrl,
		siteTitleShort,
		siteTitleLong,
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
		// Only use preact in production because of the pesky prefreshGlueCode.js errors
		process.env.NODE_ENV === "development" ? undefined : `gatsby-plugin-preact`,
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
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `${siteTitleLong} (${siteTitleShort})`,
				short_name: `${siteTitleShort} | NICE`,
				description: isBNF
					? "Key information on the selection, prescribing, dispensing and administration of medicines."
					: "Key information on the selection, prescribing, dispensing and administration of medicines used for children.",
				start_url: `/?utm_source=a2hs&utm_medium=a2hs`,
				background_color: `#fff`,
				theme_color: isBNF ? "#93da49" : "#ef4a81",
				display: `minimal-ui`,
				icon: `src/images/logo-square.svg`,
				icon_options: {
					purpose: `maskable any`,
				},
				include_favicon: false,
				shortcuts: [
					{
						name: "Drugs A to Z",
						url: "/drugs/?utm_source=a2hs&utm_medium=shortcuts",
					},
					{
						name: "Treatment summaries A to Z",
						url: "/treatment-summaries/?utm_source=a2hs&utm_medium=shortcuts",
					},
					{
						name: "Interactions A to Z",
						url: "/interactions/?utm_source=a2hs&utm_medium=shortcuts",
					},
					{
						name: "What's new",
						url: "/about/changes/?utm_source=a2hs&utm_medium=shortcuts",
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-offline`,
			options: {
				// Pre cache all the top level/important pages for offline access
				precachePages: [
					`/`,
					`/drugs/`,
					`/interactions/`,
					`/treatment-summaries/`,
					`/search/`,
					`/about/`,
					`/about/changes/`,
					`/about/labels/`,
					`/about/approximate-conversions-and-units/`,
					`/about/abbreviations-and-symbols/`,
					`/medical-devices/`,
					`/medicines-guidance/`,
					`/borderline-substances/`,
					`/nurse-prescribers-formulary/`,
					`/dental-practitioners-formulary/`,
					isBNF ? `/wound-management/` : undefined,
				].filter(Boolean),
				workboxConfig: {
					// Use the default gatsby runtimeCaching with 2 key differences:
					// use NetworkFirst for page-data.json and for HTML pages
					runtimeCaching: [
						{
							urlPattern: /(\.js$|\.css$|static\/)/,
							handler: `CacheFirst`,
						},
						{
							// Optimise for accurate/latest content rather than out-and-out performance by
							// trying to load HTML and page/app data JSON network first
							urlPattern: /\/$/,
							handler: `NetworkFirst`,
							options: {
								networkTimeoutSeconds: 1,
							},
						},
						{
							urlPattern:
								/^https?:.*\/page-data\/.*\/(page-data|app-data)\.json$/,
							handler: `NetworkFirst`,
							options: {
								networkTimeoutSeconds: 1,
							},
						},
						{
							urlPattern:
								/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
							handler: `StaleWhileRevalidate`,
						},
					],
				},
			},
		},
	].filter(Boolean),
	// Proxy the relative search endpoint for local dev
	developMiddleware: (app) => {
		app.use(
			"/api",
			createProxyMiddleware({
				target: "https://alpha-search-api.nice.org.uk",
				changeOrigin: true,
			})
		);
	},
};
