import slugify from "@sindresorhus/slugify";
import { type FC } from "react";
import striptags from "striptags";

import { type FeedFeedSimplePotContent } from "@nice-digital/gatsby-source-bnf";

export interface SimplePotContentProps extends FeedFeedSimplePotContent {
	potSlug: string;
	contentForPrefix?: "For" | "For all";
}

export const SimplePotContent: FC<SimplePotContentProps> = ({
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
