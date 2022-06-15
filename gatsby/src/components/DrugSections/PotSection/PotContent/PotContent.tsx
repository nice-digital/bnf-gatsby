import { ReactElement, type FC } from "react";
import slugify from "slugify";
import striptags from "striptags";

import { type FeedBasePotContent } from "@nice-digital/gatsby-source-bnf";

import { BasePot } from "../../types";

export interface PotContentProps {
	pot: BasePot;
	contentFor: string;
	contentForPrefix: "For" | "For all";
	showHeading: boolean;
	children: ReactElement<FeedBasePotContent>;
}

export const PotContent: FC<PotContentProps> = ({
	pot,
	contentForPrefix,
	showHeading,
	contentFor,
	children,
}) => {
	const slug = `${pot.slug}-${slugify(striptags(contentFor))}`;

	return (
		<section aria-labelledby={slug}>
			<h3 id={slug} className={showHeading ? "" : "visually-hidden"}>
				<span
					className="visually-hidden"
					dangerouslySetInnerHTML={{ __html: pot.potName + " " }}
				/>
				<span
					dangerouslySetInnerHTML={{
						__html: `${contentForPrefix} ${contentFor}`,
					}}
				/>
			</h3>

			{children}
		</section>
	);
};
