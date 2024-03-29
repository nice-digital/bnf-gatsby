import { useLocation } from "@reach/router";
import React, { type FC } from "react";
import { Helmet } from "react-helmet";

import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export interface SEOProps {
	title?: string;
	description?: string;
	noIndex?: boolean;
	additionalMetadata?: {
		name: string;
		content: string;
	}[];
}

export const SEO: FC<SEOProps> = ({
	title,
	description,
	noIndex,
	additionalMetadata,
}: SEOProps) => {
	const { pathname } = useLocation();
	const { siteUrl, siteTitleShort, siteTitleLong, isBNF } = useSiteMetadata();

	// A global CSS class allows us to distinguish BNF from BNFC in (S)CSS styles
	const globalCSSClassName = isBNF ? "site-bnf" : "site-bnfc";

	const defaultDescription = `Online access to the ${siteTitleShort} (${siteTitleLong}) content within the UK, provided by NICE`;

	return (
		<>
			<Helmet
				title={title}
				titleTemplate={`%s | ${siteTitleShort} | NICE`}
				defaultTitle={`${siteTitleShort} (${siteTitleLong}) | NICE`}
			>
				<html lang="en-GB" className={globalCSSClassName} />
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
					content={
						(title ? `${title} | ` : "") +
						`${siteTitleShort} content published by NICE`
					}
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@NICEcomms" />
				<meta name="twitter:creator" content="@NICEcomms" />
				<meta name="theme-color" content={isBNF ? "#93da49" : "#ef4a81"} />
				{additionalMetadata?.map((x, i) => (
					<meta key={i} name={x.name} content={x.content} />
				))}
				{noIndex ? <meta name="robots" content="noindex" /> : null}
				<meta name="bingbot" content="nocache" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="canonical" href={siteUrl + pathname} />
			</Helmet>
		</>
	);
};
