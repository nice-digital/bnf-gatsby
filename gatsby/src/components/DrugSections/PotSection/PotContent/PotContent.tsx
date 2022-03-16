import slugify from "@sindresorhus/slugify";
import { ReactElement, type FC } from "react";
import striptags from "striptags";

import { type FeedBasePotContent } from "@nice-digital/gatsby-source-bnf";

export interface PotContentProps {
	potSlug: string;
	contentFor: string;
	contentForPrefix: "For" | "For all";
	showHeading: boolean;
	children: ReactElement<FeedBasePotContent>;
}

export const PotContent: FC<PotContentProps> = ({
	potSlug,
	contentForPrefix,
	showHeading,
	contentFor,
	children,
}) => {
	const slug = `${potSlug}-${slugify(striptags(contentFor))}`;

	return (
		<section aria-labelledby={slug}>
			<h3
				id={slug}
				dangerouslySetInnerHTML={{
					__html: `${contentForPrefix} ${contentFor}`,
				}}
				className={showHeading ? "" : "visually-hidden"}
			/>

			{children}
		</section>
	);
};
