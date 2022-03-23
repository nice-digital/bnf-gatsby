import { FC } from "react";
import striptags from "striptags";

import styles from "./SectionNav.module.scss";

export interface SectionNavProps {
	sections: {
		id: string;
		title: string;
	}[];
}

export const SectionNav: FC<SectionNavProps> = ({ sections }) => (
	<nav aria-labelledby="navigate-to-section" className={styles.nav}>
		<h2 id="navigate-to-section" className={styles.heading}>
			Navigate to section
		</h2>
		<ol
			aria-label="Jump links to sections on this page"
			className={styles.linkList}
		>
			{sections.map((section) => (
				<li key={section.id}>
					<a href={`#${section.id}`}>{striptags(section.title)}</a>
				</li>
			))}
		</ol>
	</nav>
);
