import slugify from "@sindresorhus/slugify";
import { type FC } from "react";
import striptags from "striptags";

import {
	type FeedSimplePot,
	type FeedFeedSimplePotContent,
} from "@nice-digital/gatsby-source-bnf";

import styles from "../DrugSection.module.scss";

interface SimplePotContentProps extends FeedFeedSimplePotContent {
	potSlug: string;
	contentForPrefix?: "For" | "For all";
}

const SimplePotContent: FC<SimplePotContentProps> = ({
	potSlug,
	contentForPrefix = "For",
	contentFor,
	content,
}) => {
	const slug = `${potSlug}-${slugify(striptags(contentFor))}`;

	return (
		<section aria-labelledby={slug}>
			<h3
				id={slug}
				dangerouslySetInnerHTML={{
					__html: `${contentForPrefix} ${contentFor}`,
				}}
			/>
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</section>
	);
};

export type SimplePotProps = FeedSimplePot & {
	slug: string;
};

export const SimplePot: FC<SimplePotProps> = ({
	potName,
	slug,
	drugClassContent,
	drugContent,
	prepContent,
}) => {
	return (
		<section aria-labelledby={slug} className={styles.section}>
			<h2 id={slug}>{potName}</h2>

			{drugClassContent?.map((content) => (
				<SimplePotContent
					key={content.contentFor}
					potSlug={slug}
					contentForPrefix="For all"
					{...content}
				/>
			))}

			{drugContent && <SimplePotContent potSlug={slug} {...drugContent} />}

			{prepContent?.map((content) => (
				<SimplePotContent
					key={content.contentFor}
					potSlug={slug}
					{...content}
				/>
			))}
		</section>
	);
};
