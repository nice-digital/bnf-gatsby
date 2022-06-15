import { type FC } from "react";
import slugify from "slugify";
import striptags from "striptags";

import { type FeedNationalFundingPot } from "@nice-digital/gatsby-source-bnf";

import { type QueryResult, type WithSlug } from "@/utils";

import { PotSection } from "../PotSection/PotSection";

import { NationalFundingContent } from "./NationalFundingContent/NationalFundingContent";

export type NationalFundingProps = QueryResult<
	WithSlug<FeedNationalFundingPot>
>;

export const NationalFunding: FC<NationalFundingProps> = (props) => (
	<PotSection {...props}>
		{({
			contentForPrefix,
			content: {
				contentFor,
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
			const sectionSlugPostfix = slugify(striptags(contentFor));

			return (
				<>
					<p dangerouslySetInnerHTML={{ __html: initialText }} />

					{niceDecisions.length > 0 ? (
						<NationalFundingContent
							slug={`nice-decisions-${sectionSlugPostfix}`}
							heading={niceDecisionsTitle || "NICE decisions"}
							decisions={niceDecisions}
							contentFor={contentFor}
							contentForPrefix={contentForPrefix}
						/>
					) : null}

					{smcDecisions.length > 0 ? (
						<NationalFundingContent
							slug={`smc-decisions-${sectionSlugPostfix}`}
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
							slug={`awmsg-decisions-${sectionSlugPostfix}`}
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
						<section aria-labelledby={`nhs-restrictions-${sectionSlugPostfix}`}>
							<h4 id={`nhs-restrictions-${sectionSlugPostfix}`}>
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
