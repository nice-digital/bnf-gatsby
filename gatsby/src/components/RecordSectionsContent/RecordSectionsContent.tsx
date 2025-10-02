import React, { ReactNode, useEffect, useRef } from "react";

import { type RecordSection } from "@/utils";

import styles from "./RecordSectionsContent.module.scss";

export type RecordSectionsContentProps = {
	sections: RecordSection[];
	className?: string;
	children?: ReactNode;
};

/**
 * Renders a list of record sections from the feed content.
 *
 * Record sections are blocks of a content withing a 'simple record' from the feed.
 * For example, each about page is a simpled record, with a list of record section content blocks.
 */
export const RecordSectionsContent: React.FC<RecordSectionsContentProps> = ({
	sections,
	className,
}) => {
	const rootRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const maybeMakeScrollableTablesFocusable = () => {
			const tables = root.querySelectorAll<HTMLTableElement>("table.table");
			tables.forEach((table, i) => {
				// If the table is scrollable (usually horizontally on small screens),
				// ensure it's keyboard focusable so users can scroll with the keyboard.
				const isScrollable =
					table.scrollWidth > table.clientWidth ||
					table.scrollHeight > table.clientHeight;

				if (isScrollable && !table.hasAttribute("tabindex")) {
					table.setAttribute("tabindex", "0");

					// Add a landmark role so screen reader users know why it's focusable.
					// "region" is a generic container landmark.
					table.setAttribute("role", "region");

					// Accessible name so it isn't announced as a huge dump of table content.
					// Including the index helps distinguish if there are multiple scrollable tables on a page.
					table.setAttribute("aria-label", `Scrollable data table ${i + 1}`);
				}
			});
		};

		// Run on mount and after layout/resize as widths may change responsively
		maybeMakeScrollableTablesFocusable();
		const onResize = () => maybeMakeScrollableTablesFocusable();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	return (
		<div ref={rootRef} data-component="record-sections-content">
			{sections.map(({ slug, title, content }, i) => (
				<section key={slug} className={className} aria-labelledby={slug}>
					<h2
						id={slug}
						dangerouslySetInnerHTML={{ __html: title }}
						className={i === 0 ? styles.firstHeading : undefined}
					/>
					<div dangerouslySetInnerHTML={{ __html: content }} />
				</section>
			))}
		</div>
	);
};
