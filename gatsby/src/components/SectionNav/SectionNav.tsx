import classNames from "classnames";
import { Link } from "gatsby";
import { FC } from "react";
import striptags from "striptags";

import { isTruthy } from "@/utils";

import styles from "./SectionNav.module.scss";

export interface SectionLink {
	id?: string;
	title: string;
	to?: string;
}

export interface SectionNavProps {
	sections: (SectionLink | undefined)[];
	className?: string;
	readableMaxWidth?: boolean;
	navigateToNewPage?: boolean;
}

export const SectionNav: FC<SectionNavProps> = ({
	sections,
	className,
	readableMaxWidth = false,
}) => (
	<nav
		aria-labelledby="navigate-to-section"
		className={classNames(
			styles.nav,
			readableMaxWidth ? styles.navReadableMaxWidth : null,
			className
		)}
	>
		<h2 id="navigate-to-section" className={styles.heading}>
			{sections.some((section) => section?.id != null) && "Navigate to section"}
			{sections.some((section) => section?.to != null) && "Navigate to page"}
		</h2>
		<ol
			aria-label="Jump links to sections on this page"
			className={styles.linkList}
		>
			{sections.filter(isTruthy).map((section) => (
				<li key={section?.id || section?.to}>
					{section.id && (
						<a href={`#${section?.id}`}>{striptags(section?.title || "")}</a>
					)}
					{section.to && (
						<Link to={section?.to}>{striptags(section?.title || "")}</Link>
					)}
				</li>
			))}
		</ol>
	</nav>
);
