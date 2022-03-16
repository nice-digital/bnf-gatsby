import { type ReactElement } from "react";

import { type FeedBasePotContent } from "@nice-digital/gatsby-source-bnf";

import { type PotWithSlug } from "src/types";

import styles from "../DrugSection.module.scss";

import { PotContent } from "./PotContent/PotContent";

export interface PotSectionProps<TContent extends FeedBasePotContent>
	extends PotWithSlug {
	drugClassContent: TContent[];
	drugContent: TContent | null;
	prepContent: TContent[];
	children: (renderArgs: {
		content: TContent;
		pot: PotWithSlug;
	}) => ReactElement;
}

export const PotSection = <TPotContent extends FeedBasePotContent>({
	potName,
	slug,
	drugClassContent,
	drugContent,
	prepContent,
	children,
}: PotSectionProps<TPotContent>): ReactElement => (
	<section aria-labelledby={slug} className={styles.section}>
		<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />

		{drugClassContent.map((content) => (
			<PotContent
				key={content.contentFor}
				potSlug={slug}
				contentFor={content.contentFor}
				contentForPrefix="For all"
				showHeading={true}
			>
				{children({ content, pot: { potName, slug } })}
			</PotContent>
		))}

		{drugContent && (
			<PotContent
				key={drugContent.contentFor}
				potSlug={slug}
				contentFor={drugContent.contentFor}
				contentForPrefix="For"
				showHeading={
					(!!prepContent && prepContent.length > 0) ||
					(!!drugClassContent && drugClassContent.length > 0)
				}
			>
				{children({ content: drugContent, pot: { potName, slug } })}
			</PotContent>
		)}

		{prepContent.map((content) => (
			<PotContent
				key={content.contentFor}
				potSlug={slug}
				contentFor={content.contentFor}
				contentForPrefix="For"
				showHeading={true}
			>
				{children({ content, pot: { potName, slug } })}
			</PotContent>
		))}
	</section>
);
