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
}) => (
	<section className={styles.wrapper} aria-labelledby={slug}>
		<h2 dangerouslySetInnerHTML={{ __html: potName }} id={slug} />

		{drugContent && <IndicationsAndDoseContent content={drugContent} />}

		{drugClassContent?.map((content) => (
			<IndicationsAndDoseContent key={content.contentFor} content={content} />
		))}

		{prepContent?.map((content) => (
			<IndicationsAndDoseContent key={content.contentFor} content={content} />
		))}
	</section>
);
