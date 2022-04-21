import { type ReactElement } from "react";

import { type FeedBasePotContent } from "@nice-digital/gatsby-source-bnf";

import styles from "../DrugSection.module.scss";
import { BasePot } from "../types";

import { PotContent } from "./PotContent/PotContent";

export interface PotSectionProps<TContent extends FeedBasePotContent>
	extends BasePot {
	drugClassContent: TContent[];
	drugContent: TContent | null;
	prepContent: TContent[];
	children: (renderArgs: {
		contentForPrefix: string;
		content: TContent;
		pot: BasePot;
	}) => ReactElement;
}

export const PotSection = <TPotContent extends FeedBasePotContent>({
	drugClassContent,
	drugContent,
	prepContent,
	children: renderPotContent,
	...pot
}: PotSectionProps<TPotContent>): ReactElement => {
	return (
		<section aria-labelledby={pot.slug} className={styles.section}>
			<h2 id={pot.slug} dangerouslySetInnerHTML={{ __html: pot.potName }} />

			{drugClassContent.map((content) => (
				<PotContent
					key={content.contentFor}
					pot={pot}
					contentFor={content.contentFor}
					contentForPrefix="For all"
					showHeading={true}
				>
					{renderPotContent({ contentForPrefix: "For all", content, pot })}
				</PotContent>
			))}

			{drugContent && (
				<PotContent
					key={drugContent.contentFor}
					pot={pot}
					contentFor={drugContent.contentFor}
					contentForPrefix="For"
					showHeading={
						(!!prepContent && prepContent.length > 0) ||
						(!!drugClassContent && drugClassContent.length > 0)
					}
				>
					{renderPotContent({
						contentForPrefix: "For",
						content: drugContent,
						pot,
					})}
				</PotContent>
			)}

			{prepContent.map((content) => (
				<PotContent
					key={content.contentFor}
					pot={pot}
					contentFor={content.contentFor}
					contentForPrefix="For"
					showHeading={true}
				>
					{renderPotContent({ contentForPrefix: "For", content, pot })}
				</PotContent>
			))}
		</section>
	);
};
