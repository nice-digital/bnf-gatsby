import { useLocation } from "@reach/router";
import classNames from "classnames";
import { useState, type FC } from "react";

import ChevronDownIcon from "@nice-digital/icons/lib/ChevronDown";
import ChevronRightIcon from "@nice-digital/icons/lib/ChevronRight";
import { Container } from "@nice-digital/nds-container";

import { useIsClient } from "@/hooks/useIsClient";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import styles from "./SiteDistinction.module.scss";

export const SiteDistinction: FC = () => {
	const { pathname } = useLocation();
	const isClient = useIsClient();
	const { isBNF, siteTitleShort } = useSiteMetadata();
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div
			className={classNames(styles.wrapper, isBNF ? styles.bnf : styles.bnfc)}
		>
			<Container className={styles.container}>
				<p className={styles.tabs}>
					<span className="visually-hidden">Currently viewing </span>
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
						<span
							className={classNames(
								styles.currentSiteTab,
								styles[siteTitleShort]
							)}
						>
							{siteTitleShort}
						</span>
					)}

					<a
						className={classNames(
							styles.otherSiteTab,
							(isExpanded || !isClient) && styles.otherSiteTabExpanded
						)}
						href={
							(isBNF ? "https://bnfc.nice.org.uk" : "https://bnf.nice.org.uk") +
							pathname +
							"?ref=switch"
						}
						tabIndex={isExpanded || !isClient ? undefined : -1}
					>
						<span className="visually-hidden">switch to </span>
						{isClient ? null : <ChevronRightIcon className={styles.icon} />}
						{isBNF ? "BNFC" : "BNF"}
					</a>
				</p>
			</Container>
		</div>
	);
};
