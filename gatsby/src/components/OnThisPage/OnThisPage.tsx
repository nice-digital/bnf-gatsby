import React, { FC, useReducer } from "react";

import { useIsClient } from "@/hooks/useIsClient";

import { Toggle } from "../Toggle/Toggle";

import styles from "./OnThisPage.module.scss";

const hideThreshold = 7;
const shortenedListSize = 5;

export type OnThisPageProps = {
	sections: {
		id: string;
		title: string;
	}[];
};

export const OnThisPage: FC<OnThisPageProps> = ({ sections }) => {
	const isClient = useIsClient();
	const [isHidingMoreLinks, dispatch] = useReducer(
		() => false,
		sections.length > hideThreshold
	);

	if (sections.length <= 1) return null;

	return (
		<nav aria-labelledby="on-this-page" className={styles.wrapper}>
			<h2 id="on-this-page" className={styles.heading}>
				On this page
			</h2>
			<ol
				className={styles.list}
				aria-label="Jump links to sections on this page"
			>
				{sections.map(({ id, title }, i) => {
					return i < shortenedListSize || !isHidingMoreLinks ? (
						<li key={id}>
							<a href={`#${id}`} dangerouslySetInnerHTML={{ __html: title }} />
						</li>
					) : null;
				})}
			</ol>
			{isClient && isHidingMoreLinks ? (
				<button
					type="button"
					onClick={dispatch}
					className={styles.moreLinksButton}
				>
					<Toggle isOpen={false}>Show all sections</Toggle>
				</button>
			) : null}
		</nav>
	);
};
