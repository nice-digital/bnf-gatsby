import { type FC } from "react";

import { type FeedSimplePot } from "@nice-digital/gatsby-source-bnf";

import { WithSlug } from "src/types";

import { PotSection } from "../PotSection/PotSection";

export type SimplePotProps = WithSlug<Required<FeedSimplePot>>;

export const SimplePot: FC<SimplePotProps> = (props) => {
	return (
		<PotSection {...props}>
			{({ content: { content } }) => (
				<div dangerouslySetInnerHTML={{ __html: content }} />
			)}
		</PotSection>
	);
};
