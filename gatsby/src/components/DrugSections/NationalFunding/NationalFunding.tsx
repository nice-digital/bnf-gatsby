import { type FC } from "react";

import {
	type FeedNationalFundingPotContent,
	type FeedNationalFundingPot,
} from "@nice-digital/gatsby-source-bnf";

import { type QueryResult, type WithSlug, type WithSlugDeep } from "@/utils";

import { PotSection } from "../PotSection/PotSection";

import { NationalFundingContent } from "./NationalFundingContent/NationalFundingContent";

export type NationalFundingProps = QueryResult<
	WithSlug<WithSlugDeep<FeedNationalFundingPot, FeedNationalFundingPotContent>>
>;

export const NationalFunding: FC<NationalFundingProps> = (props) => (
	<PotSection {...props}>
		{({
			contentForPrefix,
			content: {
				contentFor,
				slug,
				initialText,
				niceDecisionsTitle,
				niceDecisions,
				smcDecisionsTitle,
				smcDecisions,
				awmsgDecisionsTitle,
				awmsgDecisions,
				nonNhsTitle,
				nonNhs,
			},
		}) => {
			return (
				<>
					<p dangerouslySetInnerHTML={{ __html: initialText }} />

					{niceDecisions.length > 0 ? (
						<NationalFundingContent
							slug={`nice-decisions-${slug}`}
							heading={niceDecisionsTitle || "NICE decisions"}
							decisions={niceDecisions}
							contentFor={contentFor}
							contentForPrefix={contentForPrefix}
						/>
					) : null}

					{smcDecisions.length > 0 ? (
						<NationalFundingContent
							slug={`smc-decisions-${slug}`}
							heading={
								smcDecisionsTitle ||
								"Scottish Medicines Consortium (SMC) decisions"
							}
							decisions={smcDecisions}
							contentFor={contentFor}
							contentForPrefix={contentForPrefix}
						/>
					) : null}

					{awmsgDecisions.length > 0 ? (
						<NationalFundingContent
							slug={`awmsg-decisions-${slug}`}
							heading={
								awmsgDecisionsTitle ||
								"All Wales Medicines Strategy Group (AWMSG)"
							}
							decisions={awmsgDecisions}
							contentFor={contentFor}
							contentForPrefix={contentForPrefix}
						/>
					) : null}

					{nonNhs && (
						<section aria-labelledby={`nhs-restrictions-${slug}`}>
							<h4 id={`nhs-restrictions-${slug}`}>
								{nonNhsTitle || "NHS restrictions"}
							</h4>
							<div dangerouslySetInnerHTML={{ __html: nonNhs }} />
						</section>
					)}
				</>
			);
		}}
	</PotSection>
);
