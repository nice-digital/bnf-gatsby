import { type FC } from "react";

import {
	type FeedNationalFundingPot,
	type FeedNationalFundingPotContent,
} from "@nice-digital/gatsby-source-bnf";

import { type PotWithSlug } from "src/types";

import { NationalFundingContent } from "./NationalFundingContent/NationalFundingContent";

export type NationalFundingProps = PotWithSlug & {
	drugContent: Required<FeedNationalFundingPotContent>;
	drugClassContent: Required<FeedNationalFundingPotContent>[];
	prepContent: Required<FeedNationalFundingPotContent>[];
} & FeedNationalFundingPot;

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

			{drugClassContent?.map((content) => (
				<NationalFundingContent
					key={content.contentFor}
					potSlug={slug}
					contentForPrefix="For all"
					showHeading={true}
					{...content}
				/>
			))}

			{drugContent && (
				<NationalFundingContent
					potSlug={slug}
					showHeading={
						(!!prepContent && prepContent.length > 0) ||
						(!!drugClassContent && drugClassContent.length > 0)
					}
					{...drugContent}
				/>
			)}

			{prepContent?.map((content) => (
				<NationalFundingContent
					key={content.contentFor}
					potSlug={slug}
					showHeading={true}
					{...content}
				/>
			))}
		</section>
	);
};
