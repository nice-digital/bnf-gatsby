import { FC } from "react";
import { type Except } from "type-fest";

import {
	type FeedIndicationsAndDosePot,
	type FeedIndicationsAndDosePotContent,
} from "@nice-digital/gatsby-source-bnf";

import styles from "./IndicationsAndDose.module.scss";

export interface IndicationsAndDoseProps {
	indicationsAndDose: FeedIndicationsAndDosePot & {
		//order: number;
		//packs: (FeedPack & { order: number })[];
	};
}

export const IndicationsAndDose: FC<IndicationsAndDoseProps> = ({
	indicationsAndDose: { potName, drugClassContent, drugContent, prepContent },
}) => (
	<section className={styles.wrapper}>
		<h2 dangerouslySetInnerHTML={{ __html: potName }} />
	</section>
);
