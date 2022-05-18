import classNames from "classnames";
import { FC } from "react";

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
			Navigate to section
		</h2>
		<ol
			aria-label="Jump links to sections on this page"
			className={styles.linkList}
		>
			{sections.filter(isTruthy).map((section) => (
				<li key={section.id}>
					<a
						href={`#${section.id}`}
						dangerouslySetInnerHTML={{ __html: section.title }}
					/>
				</li>
			))}
		</ol>
	</nav>
);
