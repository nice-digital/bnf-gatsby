import { graphql } from "gatsby";
import { FC, ReactElement } from "react";
import striptags from "striptags";

import {
	type FeedMedicinalForms,
	type FeedMedicinalForm,
} from "@nice-digital/gatsby-source-bnf";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { Prep } from "@/components/Prep/Prep";

import styles from "./medicinal-forms.module.scss";

export interface MedicinalFormsPageProps {
	data: {
		bnfDrug: {
			title: string;
			slug: string;
			medicinalForms: {
				medicinalForms: (FeedMedicinalForm & { slug: string })[];
			} & FeedMedicinalForms;
		};
	};
}

const asideInfo: ReactElement = (
	<aside className={styles.asideInfo}>
		<h2>Important information about BNF prices and buying drugs</h2>
		<p>NICE does not sell any drugs, medicines or pharmaceutical products.</p>
		<p>
			BNF prices do not reflect over-the-counter purchase pricings because they
			do not take into account VAT, professional fees, and other overheads.
		</p>
		<p>
			A fuller explanation of costs to the NHS may be obtained from the Drug
			Tariff. Separate drug tariffs are applicable to England and Wales,
			Scotland and Northern Ireland
		</p>
	</aside>
);

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
		asideContent={asideInfo}
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
					<ol className={styles.prepList}>
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
