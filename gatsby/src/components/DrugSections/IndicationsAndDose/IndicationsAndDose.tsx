import { useCallback, useEffect, useState, type FC } from "react";

import { type FeedIndicationsAndDosePot } from "@nice-digital/gatsby-source-bnf";

import { IndicationsAndDoseContent } from "@/components/DrugSections/IndicationsAndDose/IndicationsAndDoseContent/IndicationsAndDoseContent";
import { type QueryResult, type WithSlug } from "@/utils";

import styles from "./IndicationsAndDose.module.scss";

export type IndicationsAndDoseProps = WithSlug<
	QueryResult<FeedIndicationsAndDosePot>
>;

export const IndicationsAndDose: FC<IndicationsAndDoseProps> = ({
	potName,
	slug,
	drugClassContent,
	drugContent,
	prepContent,
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
		<section aria-labelledby={slug} className={styles.wrapper}>
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
