import { type FC } from "react";

import { type FeedSimplePot } from "@nice-digital/gatsby-source-bnf";

import styles from "../DrugSection.module.scss";

import { SimplePotContent } from "./SimplePotContent/SimplePotContent";

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
			<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />

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
