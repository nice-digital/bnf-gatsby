import { useStaticQuery, graphql } from "gatsby";

interface SiteMetaData {
	/** Whether the current site is BNF or BNFC */
	isBNF: boolean;
	/** Absolute URL to the site homepage, without trailing slash */
	siteUrl: string;
	/** Short site title e.g. "BNF" or "BNFC" */
	siteTitleShort: string;
	/** Full site title e.g. "British National Formulary" or "British National Formulary for Children" */
	siteTitleLong: string;
}

interface Site {
	site: {
		siteMetadata: SiteMetaData;
	};
}

/**
 * Gets the site metadata, as defined in gatsby-config
 *
 * @returns The site metadata
 */
export const useSiteMetadata = (): SiteMetaData => {
	const { site } = useStaticQuery<Site>(
		graphql`
			query SiteMetaData {
				site {
					siteMetadata {
						isBNF
						siteUrl
						siteTitleShort
						siteTitleLong
					}
				}
			}
		`
	);
	return site.siteMetadata;
};
