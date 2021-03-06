import { type FC } from "react";

import { TagList, Tag } from "@/components/TagList/TagList";
import { type SlugAndTitle } from "@/utils";

import styles from "../DrugSection.module.scss";
import { type BasePot } from "../types";

export type RelatedTreatmentSummariesProps = BasePot & {
	treatmentSummaries: SlugAndTitle[];
	pathPrefix: string;
};

export const RelatedTreatmentSummaries: FC<RelatedTreatmentSummariesProps> = ({
	slug: potSlug,
	potName,
	treatmentSummaries,
	pathPrefix,
}) => (
	<section aria-labelledby={potSlug} className={styles.section}>
		<h2 id={potSlug} dangerouslySetInnerHTML={{ __html: potName }} />

		<TagList aria-labelledby={potSlug}>
			{treatmentSummaries
				.sort((a, b) => a.slug.localeCompare(b.slug))
				.map(({ slug, title }) => (
					<Tag key={slug} href={`/${pathPrefix}/${slug}/`}>
						{title}
					</Tag>
				))}
		</TagList>
	</section>
);
