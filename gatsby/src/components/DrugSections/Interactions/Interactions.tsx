import { type FC } from "react";

import { type SlugAndTitle } from "@/utils";

import styles from "../DrugSection.module.scss";
import { InteractionsContent } from "../InteractionsContent/InteractionsContent";
import { BasePot } from "../types";

export type InteractionsProps = BasePot & {
	interactants: SlugAndTitle[];
};

export const Interactions: FC<InteractionsProps> = ({
	interactants,
	potName,
	slug,
}) => {
	return (
		<section aria-labelledby={slug} className={styles.section}>
			<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />
			<InteractionsContent interactants={interactants} />
		</section>
	);
};
