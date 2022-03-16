import slugify from "@sindresorhus/slugify";
import { type FC } from "react";
import striptags from "striptags";

import { type FeedNationalFundingPotContent } from "@nice-digital/gatsby-source-bnf";

import { NationalFundingDecisionsGroup } from "../NationalFundingDecisionsGroup/NationalFundingDecisionsGroup";

export interface NationalFundingContentProps
	extends Required<FeedNationalFundingPotContent> {
	potSlug: string;
	contentForPrefix?: "For" | "For all";
	showHeading: boolean;
}

export const NationalFundingContent: FC<NationalFundingContentProps> = ({
	potSlug,
	contentForPrefix = "For",
	contentFor,
	initialText,
	niceDecisions,
	smcDecisions,
	awmsgDecisions,
	showHeading,
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
			<p dangerouslySetInnerHTML={{ __html: initialText }} />

			{niceDecisions.length > 0 ? (
				<NationalFundingDecisionsGroup
					slug={`${slug}-nice`}
					heading="NICE decisions"
					decisions={niceDecisions}
				/>
			) : null}

			{smcDecisions.length > 0 ? (
				<NationalFundingDecisionsGroup
					slug={`${slug}-smc`}
					heading="Scottish Medicines Consortium (SMC) decisions"
					decisions={smcDecisions}
				/>
			) : null}

			{awmsgDecisions.length > 0 ? (
				<NationalFundingDecisionsGroup
					slug={`${slug}-awmsg`}
					heading="All Wales Medicines Strategy Group (AWMSG) "
					decisions={awmsgDecisions}
				/>
			) : null}
		</section>
	);
};
