import { useLocation } from "@reach/router";
import React from "react";
import { Helmet } from "react-helmet";

import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import { isBNF } from "./../../site";

// A global CSS class allows us to distinguish BNF from BNFC in (S)CSS styles
const globalCSSClassName = isBNF ? "site-bnf" : "site-bnfc";

export interface SEOProps {
	title?: string;
	description?: string;
	noIndex?: boolean;
	additionalMetadata?: {
		name: string;
		content: string;
	}[];
}

export const SEO: React.FC<SEOProps> = ({
	title,
	description,
	noIndex,
	additionalMetadata,
}: SEOProps) => {
	const { pathname } = useLocation();
	const { siteUrl, siteTitleShort, siteTitleLong } = useSiteMetadata();

	const defaultDescription = `Free online access to the UK ${siteTitleShort} (${siteTitleLong} content published by NICE`;

	return (
		<>
			<Helmet
				htmlAttributes={{ class: globalCSSClassName }}
				title={title}
				titleTemplate={`%s | ${siteTitleShort} | NICE`}
				defaultTitle={`${siteTitleShort} (${siteTitleLong}) | NICE`}
			>
				<html lang="en-GB" />
				<meta name="description" content={description || defaultDescription} />
				<meta
					property="og:description"
					content={description || defaultDescription}
				/>
				<meta property="og:url" content={siteUrl + pathname} />
				<meta property="og:locale" content="en_GB" />
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content={(title ? `${title} | ` : "") + `${siteTitleShort} | NICE`}
				/>
				<meta property="og:image" content={`${siteUrl}/open-graph-image.png`} />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta name="twitter:card" content="summary" />
				<meta
					name="twitter:image"
					content={`${siteUrl}/twitter-summary-image.png`}
				/>
				<meta
					name="twitter:image:alt"
					content={`NICE and ${siteTitleShort} logos`}
				/>
				<meta name="twitter:site" content="@NICEcomms" />
				<meta name="twitter:creator" content="@NICEcomms" />
				<meta name="theme-color" content="#004650" />
				{additionalMetadata?.map((x, i) => (
					<meta key={i} name={x.name} content={x.content} />
				))}
				{noIndex ? <meta name="robots" content="noindex" /> : null}
				<link rel="icon" href="/favicon.ico" />
				<link rel="canonical" href={siteUrl + pathname} />
			</Helmet>
		</>
	);
};
