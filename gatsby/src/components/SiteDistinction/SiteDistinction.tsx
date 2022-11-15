import { useLocation } from "@reach/router";
import classNames from "classnames";
import { useEffect, useMemo, useState, type FC } from "react";
import { Helmet } from "react-helmet";

import ChevronDownIcon from "@nice-digital/icons/lib/ChevronDown";
import ChevronRightIcon from "@nice-digital/icons/lib/ChevronRight";
import { Container } from "@nice-digital/nds-container";

import { useIsClient } from "@/hooks/useIsClient";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import styles from "./SiteDistinction.module.scss";

export const SiteDistinction: FC = () => {
	const { pathname } = useLocation(),
		isClient = useIsClient(),
		{ isBNF, siteTitleShort, siteUrl } = useSiteMetadata(),
		[isExpanded, setIsExpanded] = useState(false),
		[shouldPreFetch, setShouldPreFetch] = useState(false),
		otherSiteHref = useMemo(() => {
			const url = new URL(isClient ? window.location.href : siteUrl + pathname);
			url.host = url.host.replace(
				isBNF ? "bnf" : "bnfc",
				isBNF ? "bnfc" : "bnf"
			);
			if (!url.searchParams.has("ref"))
				url.searchParams.append("ref", "switch");
			return url.toString();
		}, [pathname, siteUrl, isBNF, isClient]);

	useEffect(() => {
		// If the page changes then it makes sense to collapse the other site link
		setIsExpanded(false);
		setShouldPreFetch(false);
	}, [pathname]);

	useEffect(() => {
		if (isExpanded && !shouldPreFetch) {
			setShouldPreFetch(true);
		}
	}, [isExpanded, shouldPreFetch, otherSiteHref]);

	return (
		<>
			<Helmet>
				{shouldPreFetch ? (
					<link rel="prefetch" as="document" href={otherSiteHref} />
				) : null}
			</Helmet>
			<div
				className={classNames(styles.wrapper, isBNF ? styles.bnf : styles.bnfc)}
			>
				<Container className={styles.container}>
					<p className={styles.tabs}>
						<span className="visually-hidden">
							Currently viewing {siteTitleShort}.
						</span>
						{isClient ? (
							<button
								type="button"
								className={classNames(
									styles.currentSiteTab,
									styles[siteTitleShort]
								)}
								aria-label={`${isExpanded ? "Hide" : "Show"} ${
									isBNF ? "BNFC" : "BNF"
								} link`}
								aria-expanded={isExpanded}
								data-tracking={`${isExpanded ? "hide" : "show"}-${
									isBNF ? "bnfc" : "bnf"
								}-link`}
								onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
							>
								<ChevronDownIcon
									className={classNames(
										styles.icon,
										isExpanded && styles.iconExpanded
									)}
								/>
								{siteTitleShort}
							</button>
						) : (
							<span className={styles.currentSiteTab}>{siteTitleShort}</span>
						)}
						<a
							className={classNames(
								styles.otherSiteTab,
								(isExpanded || !isClient) && styles.otherSiteTabExpanded
							)}
							href={otherSiteHref}
							data-tracking={`${isBNF ? "bnfc" : "bnf"}-link`}
							tabIndex={isExpanded || !isClient ? undefined : -1}
						>
							<span className="visually-hidden">switch to </span>
							{isBNF ? "BNFC" : "BNF"}
							{/* The right chevron is our non-JS fallback to make the other site tab look clickable */}
							{isClient ? null : <ChevronRightIcon className={styles.icon} />}
						</a>
					</p>
				</Container>
			</div>
		</>
	);
};
