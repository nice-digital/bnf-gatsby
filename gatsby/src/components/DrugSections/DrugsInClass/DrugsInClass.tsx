import { Link } from "gatsby";
import { type FC } from "react";

import { ColumnList } from "@nice-digital/nds-column-list";

import { type SlugAndTitle } from "@/utils";

import styles from "../DrugSection.module.scss";
import { type BasePot } from "../types";

export type Classification = SlugAndTitle & {
	order: number;
	drugs: SlugAndTitle[];
};

type ClassificationSectionProps = {
	classification: Classification;
	drugSlug: string;
};

const ClassificationSection: FC<ClassificationSectionProps> = ({
	classification: { title, slug, drugs },
	drugSlug,
}) => (
	<section aria-labelledby={slug}>
		<h3 id={slug}>
			<span className="visually-hidden">Other drugs in class</span>
			<span dangerouslySetInnerHTML={{ __html: title }} />
		</h3>
		<ColumnList aria-labelledby={slug}>
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

export type DrugsInClassProps = BasePot & {
	drug: SlugAndTitle;
	primaryClassification: Classification | null;
	secondaryClassifications: Classification[];
};

export const DrugsInClass: FC<DrugsInClassProps> = ({
	slug: potSlug,
	potName,
	primaryClassification,
	secondaryClassifications,
	drug: { slug: drugSlug },
}) => (
	<section aria-labelledby={potSlug} className={styles.section}>
		<h2
			id={potSlug}
			dangerouslySetInnerHTML={{
				__html: potName,
			}}
		/>

		{primaryClassification ? (
			<ClassificationSection
				classification={primaryClassification}
				drugSlug={drugSlug}
			/>
		) : null}

		{secondaryClassifications
			.sort((a, b) => a.order - b.order)
			.map((classification) => (
				<ClassificationSection
					key={classification.title}
					classification={classification}
					drugSlug={drugSlug}
				/>
			))}
	</section>
);
