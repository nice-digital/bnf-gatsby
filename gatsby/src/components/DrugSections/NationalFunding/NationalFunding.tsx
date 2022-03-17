import slugify from "@sindresorhus/slugify";
import { type FC } from "react";
import striptags from "striptags";

import {
	type FeedNationalFundingPot,
	type FeedNationalFundingPotContent,
} from "@nice-digital/gatsby-source-bnf";

import { type WithSlug } from "src/types";

import { PotSection } from "../PotSection/PotSection";

import { NationalFundingContent } from "./NationalFundingContent/NationalFundingContent";

export type NationalFundingProps = WithSlug<FeedNationalFundingPot> & {
	drugContent: null | Required<FeedNationalFundingPotContent>;
	drugClassContent: Required<FeedNationalFundingPotContent>[];
	prepContent: Required<FeedNationalFundingPotContent>[];
};

export const NationalFunding: FC<NationalFundingProps> = (props) => {
	return (
		<PotSection {...props}>
			{({
				content: {
					contentFor,
					initialText,
					niceDecisions,
					smcDecisions,
					awmsgDecisions,
				},
			}) => {
				const sectionSlugPostfix = slugify(striptags(contentFor));

				return (
					<>
						<p dangerouslySetInnerHTML={{ __html: initialText }} />

						{niceDecisions.length > 0 ? (
							<NationalFundingContent
								slug={`nice-decisions-${sectionSlugPostfix}`}
								heading="NICE decisions"
								decisions={niceDecisions}
							/>
						) : null}

						{smcDecisions.length > 0 ? (
							<NationalFundingContent
								slug={`smc-decisions-${sectionSlugPostfix}`}
								heading="Scottish Medicines Consortium (SMC) decisions"
								decisions={smcDecisions}
							/>
						) : null}

						{awmsgDecisions.length > 0 ? (
							<NationalFundingContent
								slug={`awmsg-decisions-${sectionSlugPostfix}`}
								heading="All Wales Medicines Strategy Group (AWMSG)"
								decisions={awmsgDecisions}
							/>
						) : null}
					</>
				);
			}}
		</PotSection>
	);
};
