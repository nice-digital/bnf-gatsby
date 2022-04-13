import { Link } from "gatsby";
import { type FC } from "react";

import { ColumnList } from "@nice-digital/nds-column-list";

import { type SlugAndTitle } from "@/utils";

import styles from "../DrugSection.module.scss";
import { type BasePot } from "../types";

export type DrugsInClassProps = BasePot & {
	drugs: SlugAndTitle[];
	drug: SlugAndTitle;
};

export const DrugsInClass: FC<DrugsInClassProps> = ({
	slug: potSlug,
	potName,
	drugs,
	drug: { slug: drugSlug },
}) => (
	<section aria-labelledby={potSlug} className={styles.section}>
		<h2
			id={potSlug}
			dangerouslySetInnerHTML={{
				__html: potName,
			}}
		/>

		<ColumnList aria-labelledby={potSlug}>
			{drugs
				.filter((drug) => drug.slug !== drugSlug)
				.sort((a, b) => a.slug.localeCompare(b.slug))
				.map(({ slug, title }) => (
					<li key={slug}>
						<Link
							to={`/drugs/${slug}/`}
							dangerouslySetInnerHTML={{ __html: title }}
						></Link>
					</li>
				))}
		</ColumnList>
	</section>
);
