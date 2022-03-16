import { Link } from "@reach/router";
import { type FC, type ReactNode } from "react";

import { FeedFundingDecision } from "@nice-digital/gatsby-source-bnf";
import { Card } from "@nice-digital/nds-card";

export interface NationalFundingDecisionsGroupProps {
	decisions: FeedFundingDecision[];
	slug: string;
	heading: ReactNode;
}

export const NationalFundingDecisionsGroup: FC<
	NationalFundingDecisionsGroupProps
> = ({ decisions, slug, heading }) => (
	<section aria-labelledby={slug}>
		<h4 id={slug}>{heading}</h4>
		<ul className="list list--unstyled" aria-labelledby={slug}>
			{decisions.map(({ fundingIdentifier, url, approvedForUse, title }) => (
				<li key={fundingIdentifier}>
					<Card
						headingText={fundingIdentifier}
						elementType="article"
						summary={
							title ? (
								<span dangerouslySetInnerHTML={{ __html: title }} />
							) : null
						}
						link={{
							elementType: Link,
							destination: url,
						}}
						metadata={[
							{
								label: "Funding decision:",
								visibleLabel: false,
								value: approvedForUse,
							},
						]}
					/>
				</li>
			))}
		</ul>
	</section>
);
