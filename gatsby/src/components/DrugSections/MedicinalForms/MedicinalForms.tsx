import { Link } from "gatsby";
import { type FC } from "react";

import { type MedicinalFormsWithSlugs, type PotWithSlug } from "src/types";

import styles from "../DrugSection.module.scss";

export type MedicinalFormsProps = PotWithSlug &
	MedicinalFormsWithSlugs & { drugSlug: string };

export const MedicinalForms: FC<MedicinalFormsProps> = ({
	potName,
	slug,
	medicinalForms,
	initialStatement,
	specialOrderManufacturersStatement,
	drugSlug,
}) => {
	return (
		<section aria-labelledby={slug} className={styles.section}>
			<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />
			{}
			<p dangerouslySetInnerHTML={{ __html: initialStatement }} />
			{specialOrderManufacturersStatement && (
				<p
					dangerouslySetInnerHTML={{
						__html: specialOrderManufacturersStatement,
					}}
				/>
			)}
			{medicinalForms && medicinalForms?.length ? (
				<ul>
					{medicinalForms.map(({ form, slug }) => (
						<li key={form} aria-labelledby={slug}>
							<Link to={`/drugs/${drugSlug}/medicinal-forms/#${slug}`}>
								{form}
							</Link>
						</li>
					))}
				</ul>
			) : null}
		</section>
	);
};
