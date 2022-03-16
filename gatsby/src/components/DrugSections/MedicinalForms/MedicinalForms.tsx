import { Link } from "gatsby";
import { type FC } from "react";

import { type MedicinalFormsWithSlugs, type PotWithSlug } from "src/types";

import styles from "../DrugSection.module.scss";

export type MedicinalFormsProps = PotWithSlug &
	MedicinalFormsWithSlugs & { drugSlug: string; drugTitle: string };

export const MedicinalForms: FC<MedicinalFormsProps> = ({
	potName,
	slug,
	medicinalForms,
	initialStatement,
	specialOrderManufacturersStatement,
	drugSlug,
	drugTitle,
}) => {
	return (
		<section aria-labelledby={slug} className={styles.section}>
			<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />
			<p dangerouslySetInnerHTML={{ __html: initialStatement }} />
			{specialOrderManufacturersStatement && (
				<p
					dangerouslySetInnerHTML={{
						__html: specialOrderManufacturersStatement,
					}}
				/>
			)}
			{medicinalForms.length > 0 ? (
				<>
					<p>
						View{" "}
						<Link
							to={`/drugs/${drugSlug}/medicinal-forms/`}
							id="medicinal-forms-link"
						>
							<span dangerouslySetInnerHTML={{ __html: drugTitle }} /> medicinal
							forms and pricing information
						</Link>{" "}
						or jump straight to:
					</p>
					<ul aria-labelledby="medicinal-forms-link">
						{medicinalForms.map(({ form, slug }) => (
							<li key={form}>
								<Link to={`/drugs/${drugSlug}/medicinal-forms/#${slug}`}>
									{form}
								</Link>
							</li>
						))}
					</ul>
				</>
			) : null}
		</section>
	);
};
