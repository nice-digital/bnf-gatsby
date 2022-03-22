import { type FC } from "react";

import { type FeedSimplePot } from "@nice-digital/gatsby-source-bnf";

import { type QueryResult, type WithSlug } from "@/utils";

import { PotSection } from "../PotSection/PotSection";

export type SimplePotProps = WithSlug<QueryResult<FeedSimplePot>>;

export const SimplePot: FC<SimplePotProps> = (props) => {
	return (
		<PotSection {...props}>
			{({ content: { content } }) => (
				<div dangerouslySetInnerHTML={{ __html: content }} />
			)}
		</PotSection>
	);
};
