import { type FC } from "react";

import { type FeedSimplePot } from "@nice-digital/gatsby-source-bnf";

export interface SimplePotProps {
	data: FeedSimplePot & {
		slug: string;
	};
}

export const SimplePot: FC<SimplePotProps> = ({
	data: { potName, slug, drugClassContent, drugContent, prepContent },
}) => {
	return (
		<section aria-labelledby={slug}>
			<h2 id={slug}>{potName}</h2>
		</section>
	);
};
