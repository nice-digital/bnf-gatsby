import { type FC } from "react";

import {
	type FeedIndicationsAndDosePotContent,
	type FeedIndicationsAndDosePot,
} from "@nice-digital/gatsby-source-bnf";

import { AccordionGroup } from "@/components/AccordionGroup/AccordionGroup";
import { IndicationsAndDoseContent } from "@/components/DrugSections/IndicationsAndDose/IndicationsAndDoseContent/IndicationsAndDoseContent";
import { WithSlugDeep, type QueryResult, type WithSlug } from "@/utils";

import styles from "./IndicationsAndDose.module.scss";

export type IndicationsAndDoseProps = WithSlug<
	QueryResult<
		WithSlugDeep<FeedIndicationsAndDosePot, FeedIndicationsAndDosePotContent>
	>
>;

export const IndicationsAndDose: FC<IndicationsAndDoseProps> = ({
	potName,
	slug,
	drugClassContent,
	drugContent,
	prepContent,
}) => {
	const numberOfSections =
			Number(!!drugContent) + drugClassContent.length + prepContent.length,
		collapsible = numberOfSections > 1;

	const bodyContent = (
		<>
			{drugContent && (
				<IndicationsAndDoseContent
					content={drugContent}
					collapsible={collapsible}
				/>
			)}

			{drugClassContent?.map((content) => (
				<IndicationsAndDoseContent
					key={content.contentFor}
					content={content}
					collapsible={collapsible}
					contentForPrefix="For all"
				/>
			))}

			{prepContent?.map((content) => (
				<IndicationsAndDoseContent
					key={content.contentFor}
					content={content}
					collapsible={collapsible}
				/>
			))}
		</>
	);

	return (
		<section aria-labelledby={slug} className={styles.wrapper}>
			<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />

			{collapsible ? (
				<AccordionGroup
					toggleText={(isOpen) =>
						`${
							isOpen ? "Hide" : "Show"
						} all indications and dose (${numberOfSections})`
					}
				>
					{bodyContent}
				</AccordionGroup>
			) : (
				bodyContent
			)}
		</section>
	);
};
