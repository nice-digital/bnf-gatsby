import React, { FC } from "react";
import striptags from "striptags";

import styles from "./OnThisPage.module.scss";

export type OnThisPageProps = {
	sections: {
		id: string;
		title: string;
	}[];
};

export const OnThisPage: FC<OnThisPageProps> = ({ sections }) => {
	return (
		<nav aria-labelledby="on-this-page" className={styles.wrapper}>
			<h2 id="on-this-page" className={styles.heading}>
				On this page
			</h2>
			<ol
				className={styles.list}
				aria-label="Jump links to sections on this page"
			>
				{sections.map((section) => (
					<li key={section.id}>
						<a href={`#${section.id}`}>{striptags(section.title)}</a>
					</li>
				))}
			</ol>
		</nav>
	);
};
