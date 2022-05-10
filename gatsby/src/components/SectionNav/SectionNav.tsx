import classNames from "classnames";
import { Link } from "gatsby";
import { FC } from "react";
import striptags from "striptags";

import { isTruthy } from "@/utils";

import styles from "./SectionNav.module.scss";

export interface SectionLink {
	id: string;
	title: string;
}

export interface SectionNavProps {
	sections: (SectionLink | undefined)[];
	className?: string;
	readableMaxWidth?: boolean;
	navigateToAnotherPage?: boolean;
}

export const SectionNav: FC<SectionNavProps> = ({
	sections,
	className,
	readableMaxWidth = false,
	navigateToAnotherPage = false,
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
			{navigateToAnotherPage ? "Navigate to page" : "Navigate to section"}
		</h2>
		<ol
			aria-label="Jump links to sections on this page"
			className={styles.linkList}
		>
			{sections.filter(isTruthy).map((section) => (
				<li key={section?.id}>
					{navigateToAnotherPage ? (
						<Link to={section?.id}>{striptags(section?.title || "")}</Link>
					) : (
						<a href={`#${section?.id}`}>{striptags(section?.title || "")}</a>
					)}
				</li>
			))}
		</ol>
	</nav>
);
