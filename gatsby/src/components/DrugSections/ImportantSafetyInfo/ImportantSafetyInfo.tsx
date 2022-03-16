import { type FC } from "react";

import { type FeedSimplePot } from "@nice-digital/gatsby-source-bnf";
import { Panel } from "@nice-digital/nds-panel";

import { type WithSlug } from "src/types";

import sectionStyles from "../DrugSection.module.scss";
import { PotContent } from "../PotSection/PotContent/PotContent";

import styles from "./ImportantSafetyInfo.module.scss";

export type ImportantSafetyInfoProps = WithSlug<FeedSimplePot>;

export const ImportantSafetyInfo: FC<ImportantSafetyInfoProps> = ({
	potName,
	slug,
	drugClassContent,
	drugContent,
	prepContent,
}) => {
	return (
		<section aria-labelledby={slug} className={sectionStyles.section}>
			<Panel variant="primary">
				<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />

				{drugClassContent?.map(({ content, contentFor }) => (
					<PotContent
						key={contentFor}
						potSlug={slug}
						contentFor={contentFor}
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
						potSlug={slug}
						contentFor={drugContent.contentFor}
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

				{prepContent?.map(({ content, contentFor }) => (
					<PotContent
						key={contentFor}
						potSlug={slug}
						contentFor={contentFor}
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
