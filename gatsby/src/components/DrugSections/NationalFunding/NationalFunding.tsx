import { type FC } from "react";

import { type FeedNationalFundingPot } from "@nice-digital/gatsby-source-bnf";

import { type PotWithSlug } from "src/types";

export type NationalFundingProps = PotWithSlug & FeedNationalFundingPot;

export const NationalFunding: FC<NationalFundingProps> = ({
	potName,
	slug,
	drugClassContent,
	drugContent,
	prepContent,
}) => {
	return (
		<section aria-labelledby={slug}>
			<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />
			<p>TODO: Funding</p>
		</section>
	);
};
