import { type FC } from "react";

import {
	type FeedFeedSimplePotContent,
	type FeedSimplePot,
} from "@nice-digital/gatsby-source-bnf";
import { Panel } from "@nice-digital/nds-panel";

import { type WithSlugDeep, type WithSlug } from "@/utils";

import sectionStyles from "../DrugSection.module.scss";
import { PotContent } from "../PotSection/PotContent/PotContent";

import styles from "./ImportantSafetyInfo.module.scss";

export type ImportantSafetyInfoProps = WithSlug<
	WithSlugDeep<FeedSimplePot, FeedFeedSimplePotContent>
>;

export const ImportantSafetyInfo: FC<ImportantSafetyInfoProps> = ({
	drugClassContent,
	drugContent,
	prepContent,
	...pot
}) => {
	return (
		<section aria-labelledby={pot.slug} className={sectionStyles.section}>
			<Panel variant="primary" className={styles.panel}>
				<h2 id={pot.slug} dangerouslySetInnerHTML={{ __html: pot.potName }} />

				{drugClassContent?.map(({ content, contentFor, slug }) => (
					<PotContent
						key={contentFor}
						pot={pot}
						contentFor={contentFor}
						contentForSlug={slug}
						contentForPrefix="For all"
						showHeading={true}
					>
						<div
							className={styles.panelContents}
							dangerouslySetInnerHTML={{ __html: content }}
						/>
					</PotContent>
				))}

				{drugContent && (
					<PotContent
						key={drugContent.contentFor}
						pot={pot}
						contentFor={drugContent.contentFor}
						contentForSlug={drugContent.slug}
						contentForPrefix="For"
						showHeading={
							(!!prepContent && prepContent.length > 0) ||
							(!!drugClassContent && drugClassContent.length > 0)
						}
					>
						<div
							className={styles.panelContents}
							dangerouslySetInnerHTML={{ __html: drugContent.content }}
						/>
					</PotContent>
				)}

				{prepContent?.map(({ content, contentFor, slug }) => (
					<PotContent
						key={contentFor}
						pot={pot}
						contentFor={contentFor}
						contentForSlug={slug}
						contentForPrefix="For"
						showHeading={true}
					>
						<div
							className={styles.panelContents}
							dangerouslySetInnerHTML={{ __html: content }}
						/>
					</PotContent>
				))}
			</Panel>
		</section>
	);
};
