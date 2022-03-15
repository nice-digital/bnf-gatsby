import { useCallback, useEffect, useState, type FC } from "react";

import { type FeedIndicationsAndDosePot } from "@nice-digital/gatsby-source-bnf";

import { IndicationsAndDoseContent } from "@/components/IndicationsAndDoseContent/IndicationsAndDoseContent";

import styles from "./IndicationsAndDose.module.scss";

export interface IndicationsAndDoseProps {
	indicationsAndDose: FeedIndicationsAndDosePot & {
		slug: string;
	};
}

export const IndicationsAndDose: FC<IndicationsAndDoseProps> = ({
	indicationsAndDose: {
		potName,
		slug,
		drugClassContent,
		drugContent,
		prepContent,
	},
}) => {
	const numberOfSections =
			(drugContent ? 1 : 0) +
			(drugClassContent || []).length +
			(prepContent || []).length,
		collapsible = numberOfSections > 1;

	const [defaultOpen, setDefaultOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const toggleAllSectionsClickHandler = useCallback(() => {
		setDefaultOpen((defaultOpen) => !defaultOpen);
	}, [setDefaultOpen]);

	return (
		<section className={styles.wrapper} aria-labelledby={slug}>
			<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />

			{isMounted && collapsible ? (
				<button
					type="button"
					className={styles.toggleAllButton}
					onClick={toggleAllSectionsClickHandler}
				>
					{defaultOpen ? "Hide" : "Show"} all {numberOfSections} sections
				</button>
			) : null}

			{drugContent && (
				<IndicationsAndDoseContent
					content={drugContent}
					collapsible={collapsible}
					defaultOpen={defaultOpen}
				/>
			)}

			{drugClassContent?.map((content) => (
				<IndicationsAndDoseContent
					key={content.contentFor}
					content={content}
					collapsible={collapsible}
					defaultOpen={defaultOpen}
					contentForPrefix="For all"
				/>
			))}

			{prepContent?.map((content) => (
				<IndicationsAndDoseContent
					key={content.contentFor}
					content={content}
					collapsible={collapsible}
					defaultOpen={defaultOpen}
				/>
			))}
		</section>
	);
};
