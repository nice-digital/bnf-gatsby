import { type FC, type ReactNode } from "react";

import { FeedFundingDecision } from "@nice-digital/gatsby-source-bnf";
import { Card } from "@nice-digital/nds-card";

import { type QueryResult } from "@/utils";

import styles from "./NationalFundingContent.module.scss";

export interface NationalFundingContentProps {
	decisions: QueryResult<FeedFundingDecision>[];
	slug: string;
	heading: ReactNode;
}

export const NationalFundingContent: FC<NationalFundingContentProps> = ({
	decisions,
	slug,
	heading,
}) => (
	<section aria-labelledby={slug}>
		<h4 id={slug}>{heading}</h4>
		<ul className={`list--unstyled ${styles.list}`} aria-labelledby={slug}>
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
