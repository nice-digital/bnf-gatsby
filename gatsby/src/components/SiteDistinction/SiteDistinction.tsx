import { useLocation } from "@reach/router";
import classNames from "classnames";
import { useMemo, useState, type FC } from "react";

import ChevronDownIcon from "@nice-digital/icons/lib/ChevronDown";
import ChevronRightIcon from "@nice-digital/icons/lib/ChevronRight";
import { Container } from "@nice-digital/nds-container";

import { useIsClient } from "@/hooks/useIsClient";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import styles from "./SiteDistinction.module.scss";

export const SiteDistinction: FC = () => {
	const { href } = useLocation(),
		isClient = useIsClient(),
		{ isBNF, siteTitleShort } = useSiteMetadata(),
		[isExpanded, setIsExpanded] = useState(false),
		otherSiteHref = useMemo(() => {
			const url = new URL(href);
			url.host = url.host.replace(
				isBNF ? "bnf" : "bnfc",
				isBNF ? "bnfc" : "bnf"
			);
			url.searchParams.append("ref", "switch");
			return url.toString();
		}, [href, isBNF]);

	return (
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
	);
};
