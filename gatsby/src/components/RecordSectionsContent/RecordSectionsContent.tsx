import React from "react";

import { type RecordSection } from "@/utils";

import styles from "./RecordSectionsContent.module.scss";

export type RecordSectionsContentProps = {
	sections: RecordSection[];
};

/**
 * Renders a list of record sections from the feed content.
 *
 * Record sections are blocks of a content withing a 'simple record' from the feed.
 * For example, each about page is a simpled record, with a list of record section content blocks.
 */
export const RecordSectionsContent: React.FC<RecordSectionsContentProps> = ({
	sections,
}) => {
	sections = sections.sort((a, b) => a.order - b.order);

	return (
		<>
			{sections.map(({ slug, title, content }, i) => (
				<section key={slug} aria-labelledby={slug}>
					<h2
						id={slug}
						dangerouslySetInnerHTML={{ __html: title }}
						className={i === 0 ? styles.firstHeading : undefined}
					/>
					<div dangerouslySetInnerHTML={{ __html: content }} />
				</section>
			))}
		</>
	);
};
