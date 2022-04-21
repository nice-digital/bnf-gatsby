import { graphql, Link } from "gatsby";
import { FC, ReactElement } from "react";
import striptags from "striptags";
import { type Merge, type Except } from "type-fest";

import {
	type FeedMedicinalForms,
	type FeedMedicinalForm,
	FeedLabel,
} from "@nice-digital/gatsby-source-bnf";
import WarningIcon from "@nice-digital/icons/lib/Warning";

import { Accordion, AccordionTheme } from "@/components/Accordion/Accordion";
import labelStyles from "@/components/CautionaryAndAdvisoryLabel/CautionaryAndAdvisoryLabel.module.scss";
import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { Prep } from "@/components/Prep/Prep";
import { type QueryResult, WithSlug } from "@/utils";

import styles from "./medicinal-forms.module.scss";

type queryMedicinalForm = Merge<
	WithSlug<FeedMedicinalForm>,
	{
		cautionaryAndAdvisoryLabels?: {
			label: Except<FeedLabel, "description" | "qualifier">;
			qualifier: string | null;
		}[];
	}
>;

export interface MedicinalFormsPageProps {
	data: {
		bnfDrug: {
			title: string;
			slug: string;
			medicinalForms: QueryResult<
				FeedMedicinalForms & {
					medicinalForms: queryMedicinalForm[];
				}
			>;
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
		headerCta={
			<Link to={`/drugs/${slug}/`}>
				View monograph
				<span className="visually-hidden">
					{" "}
					for <span dangerouslySetInnerHTML={{ __html: title }}></span>
				</span>
			</Link>
		}
	>
		<p dangerouslySetInnerHTML={{ __html: initialStatement }} />
		{specialOrderManufacturersStatement && (
			<p
				dangerouslySetInnerHTML={{ __html: specialOrderManufacturersStatement }}
			/>
		)}
		{medicinalForms.map(
			({
				form,
				slug,
				preps,
				electrolytes,
				excipients,
				cautionaryAndAdvisoryLabels,
			}) => {
				const labelList = cautionaryAndAdvisoryLabels?.length ? (
					<ul className={styles.labelList}>
						{cautionaryAndAdvisoryLabels.map(({ label, qualifier }) => (
							<li
								className={labelStyles.label}
								key={`${slug}-label-${label.number}`}
							>
								<h4 className={styles.labelHeading}>
									Label {label.number} {qualifier && `(${qualifier})`}
								</h4>
								<p>{label.englishRecommendation}</p>
								<p lang="cy" className={labelStyles.welsh}>
									{label.welshRecommendation}
								</p>
							</li>
						))}
					</ul>
				) : null;

				return (
					<section className={styles.form} key={form} aria-labelledby={slug}>
						<h2 id={slug}>{form}</h2>
						<p>All products</p>
						{labelList && (
							<Accordion
								className={styles.labelAccordion}
								theme={AccordionTheme.Warning}
								title={
									<h3 className={styles.labelAccordionHeading}>
										<WarningIcon className={styles.warningIcon} />
										Cautionary and advisory labels
									</h3>
								}
							>
								{labelList}
							</Accordion>
						)}
						{electrolytes && (
							<>
								<h3>Electrolytes</h3>
								<p>{electrolytes}</p>
							</>
						)}
						{excipients && (
							<>
								<h3>Excipients</h3>
								<p>{excipients}</p>
							</>
						)}
						{preps.length ? (
							<ol className={styles.prepList}>
								{preps.map((prep) => (
									<li key={prep.ampId}>
										<Prep prep={prep}>
											{labelList && (
												<Accordion
													className={styles.labelAccordion}
													theme={AccordionTheme.Warning}
													title={
														<h4 className={styles.nestedLabelAccordionHeading}>
															Cautionary and advisory labels
														</h4>
													}
												>
													{labelList}
												</Accordion>
											)}
										</Prep>
									</li>
								))}
							</ol>
						) : null}
					</section>
				);
			}
		)}
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
					electrolytes
					excipients
					preps {
						...FullPrep
					}
					cautionaryAndAdvisoryLabels {
						label {
							number
							englishRecommendation
							welshRecommendation
						}
						qualifier
					}
				}
			}
		}
	}
`;

export default MedicinalFormsPage;
