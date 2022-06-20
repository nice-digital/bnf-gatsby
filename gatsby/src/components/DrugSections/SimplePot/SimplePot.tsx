import { type FC } from "react";

import {
	type FeedSimplePotContent,
	type FeedSimplePot,
} from "@nice-digital/gatsby-source-bnf";

import { type QueryResult, type WithSlug, type WithSlugDeep } from "@/utils";

import { PotSection } from "../PotSection/PotSection";

export type SimplePotProps = WithSlug<
	QueryResult<WithSlugDeep<FeedSimplePot, FeedSimplePotContent>>
>;

export const SimplePot: FC<SimplePotProps> = (props) => {
	return (
		<PotSection {...props}>
			{({ content: { content } }) => (
				<div dangerouslySetInnerHTML={{ __html: content }} />
			)}
		</PotSection>
	);
};
