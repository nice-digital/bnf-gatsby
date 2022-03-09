import { type FC } from "react";

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
	const shouldCollapseSections =
		(!drugContent ? 0 : 1) +
			(drugClassContent || []).length +
			(prepContent || []).length >
		1;

	return (
		<section className={styles.wrapper} aria-labelledby={slug}>
			<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />

			{drugContent && (
				<IndicationsAndDoseContent
					content={drugContent}
					collapsible={shouldCollapseSections}
				/>
			)}

			{drugClassContent?.map((content) => (
				<IndicationsAndDoseContent
					key={content.contentFor}
					content={content}
					collapsible={shouldCollapseSections}
				/>
			))}

			{prepContent?.map((content) => (
				<IndicationsAndDoseContent
					key={content.contentFor}
					content={content}
					collapsible={shouldCollapseSections}
				/>
			))}
		</section>
	);
};
