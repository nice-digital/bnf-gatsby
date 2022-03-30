import { graphql } from "gatsby";
import { FC } from "react";
import striptags from "striptags";

import {
	type FeedMedicinalForms,
	type FeedMedicinalForm,
} from "@nice-digital/gatsby-source-bnf";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { Prep } from "@/components/Prep/Prep";
import { type QueryResult, type WithSlugDeep } from "@/utils";

export interface MedicinalFormsPageProps {
	data: {
		bnfDrug: {
			title: string;
			slug: string;
			medicinalForms: QueryResult<
				WithSlugDeep<FeedMedicinalForms, FeedMedicinalForm>
			>;
		};
	};
}

const MedicinalFormsPage: FC<MedicinalFormsPageProps> = ({
	data: {
		bnfDrug: {
			title,
			slug,
			medicinalForms: {
				initialStatement,
				medicinalForms,
				specialOrderManufacturersStatement,
			},
		},
	},
}) => (
	<DetailsPageLayout
		preheading={`${title} `}
		titleHtml="Medicinal forms"
		parentTitleParts={[striptags(title), "Drugs"]}
		parentBreadcrumbs={[
			{
				href: `/drugs/`,
				text: "Drugs",
			},
			{
				href: `/drugs/${slug}/`,
				text: striptags(title),
			},
		]}
		sections={medicinalForms.map(({ form, slug }) => ({
			id: slug,
			title: form,
		}))}
	>
		<p dangerouslySetInnerHTML={{ __html: initialStatement }} />
		{specialOrderManufacturersStatement && (
			<p
				dangerouslySetInnerHTML={{ __html: specialOrderManufacturersStatement }}
			/>
		)}
		{medicinalForms.map(({ form, slug, preps }) => (
			<section key={form} aria-labelledby={slug}>
				<h2 id={slug}>{form}</h2>
				{preps.length ? (
					<ol>
						{preps.map((prep) => (
							<li key={prep.ampId}>
								<Prep prep={prep} />
							</li>
						))}
					</ol>
				) : null}
			</section>
		))}
	</DetailsPageLayout>
);

export const query = graphql`
	query ($id: String) {
		bnfDrug(id: { eq: $id }) {
			title
			slug
			medicinalForms {
				initialStatement
				specialOrderManufacturersStatement
				medicinalForms {
					form
					slug
					preps {
						...FullPrep
					}
				}
			}
		}
	}
`;

export default MedicinalFormsPage;
