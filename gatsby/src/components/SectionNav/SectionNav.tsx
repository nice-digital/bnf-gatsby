import { FC } from "react";
import striptags from "striptags";

import styles from "./SectionNav.module.scss";

export interface SectionLink {
	id: string;
	title: string;
}

export interface SectionNavProps {
	sections: (SectionLink | undefined)[];
	className?: string;
	twoColumns?: boolean;
}

const truthy = (link: SectionLink | undefined): link is SectionLink => !!link;

export const SectionNav: FC<SectionNavProps> = ({
	sections,
	className,
	twoColumns,
}) => (
	<nav
		aria-labelledby="navigate-to-section"
		className={[styles.linkList, className].join(" ")}
	>
		<h2 id="navigate-to-section" className={styles.heading}>
			Navigate to section
		</h2>
		<ol
			aria-label="Jump links to sections on this page"
			className={[styles.linkList, twoColumns ? styles.twoColumns : ""].join(
				" "
			)}
		>
			{sections.filter(truthy).map((section) => (
				<li key={section.id}>
					<a href={`#${section.id}`}>{striptags(section.title)}</a>
				</li>
			))}
		</ol>
	</nav>
);
