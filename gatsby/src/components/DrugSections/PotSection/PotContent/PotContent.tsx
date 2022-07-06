import { ReactElement, type FC } from "react";

import { type FeedBasePotContent } from "@nice-digital/gatsby-source-bnf";

import { BasePot } from "../../types";

export interface PotContentProps {
	pot: BasePot;
	contentFor: string;
	contentForSlug: string;
	contentForPrefix: "For" | "For all";
	showHeading: boolean;
	children: ReactElement<FeedBasePotContent>;
}

export const PotContent: FC<PotContentProps> = ({
	pot,
	contentForPrefix,
	showHeading,
	contentFor,
	contentForSlug,
	children,
}) => {
	const slug = `${pot.slug}-${contentForSlug}`;

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
