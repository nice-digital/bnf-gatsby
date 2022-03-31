import { Link } from "gatsby";
import { type FC } from "react";

import { type WithSlug, type SlugAndTitle } from "@/utils";

export type MedicinalFormsContentProps = {
	drug: SlugAndTitle;
	medicinalForms: WithSlug<{ form: string }>[];
	initialStatement: string;
	specialOrderManufacturersStatement: string | null;
};

export const MedicinalFormsContent: FC<MedicinalFormsContentProps> = ({
	drug,
	medicinalForms,
	initialStatement,
	specialOrderManufacturersStatement,
}) => {
	const medicinalFormsPagePath = `/drugs/${drug.slug}/medicinal-forms/`;

	return (
		<>
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
						<Link to={medicinalFormsPagePath} id="medicinal-forms-link">
							View medicinal forms and pricing&nbsp;information
						</Link>
					</p>
					<p>Or jump straight to:</p>
					<ul aria-label={`Links to each medicinal form`}>
						{medicinalForms.map(({ form, slug }) => (
							<li key={form}>
								<Link to={`${medicinalFormsPagePath}#${slug}`}>{form}</Link>
							</li>
						))}
					</ul>
				</>
			) : null}
		</>
	);
};
