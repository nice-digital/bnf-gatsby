import { type FC } from "react";

import { type FeedSimplePot } from "@nice-digital/gatsby-source-bnf";
import { Panel } from "@nice-digital/nds-panel";

import { type PotWithSlug } from "src/types";

import styles from "../DrugSection.module.scss";

export type ImportantSafetyInfoProps = PotWithSlug & FeedSimplePot;

export const ImportantSafetyInfo: FC<ImportantSafetyInfoProps> = ({
	potName,
	slug,
	drugClassContent,
	drugContent,
	prepContent,
}) => {
	return (
		<section aria-labelledby={slug} className={styles.section}>
			<Panel variant="primary">
				<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />
				<p>TODO: Important safety info</p>
			</Panel>
		</section>
	);
};
