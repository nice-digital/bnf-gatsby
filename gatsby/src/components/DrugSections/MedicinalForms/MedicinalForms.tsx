import { type FC } from "react";

import styles from "../DrugSection.module.scss";
import {
	MedicinalFormsContent,
	type MedicinalFormsContentProps,
} from "../MedicinalFormsContent/MedicinalFormsContent";
import { BasePot } from "../types";

export type MedicinalFormsProps = BasePot & MedicinalFormsContentProps;

export const MedicinalForms: FC<MedicinalFormsProps> = ({
	potName,
	slug,
	...props
}) => {
	return (
		<section aria-labelledby={slug} className={styles.section}>
			<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />
			<MedicinalFormsContent {...props} />
		</section>
	);
};
