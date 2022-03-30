import { graphql, Link } from "gatsby";
import React, { useMemo, type ElementType, type FC } from "react";
import striptags from "striptags";
import { type Except } from "type-fest";

import {
	type FeedDrug,
	type FeedBaseNamedPot,
} from "@nice-digital/gatsby-source-bnf";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Panel } from "@nice-digital/nds-panel";

import {
	Constituents,
	SimplePot,
	IndicationsAndDose,
	type IndicationsAndDoseProps,
	MedicinalForms,
	type BasePot,
} from "@/components/DrugSections";
import { Layout } from "@/components/Layout/Layout";
import { SectionNav } from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import {
	isTruthy,
	type QueryResult,
	type SlugAndTitle,
	type WithSlugDeep,
	type WithSlug,
} from "@/utils";

import styles from "./index.module.scss";

type IgnoredDrugFields = keyof Pick<
	FeedDrug,
	| "id"
	| "sid"
	| "primaryClassification"
	| "secondaryClassifications"
	| "reviewDate"
	| "constituentDrugs"
	| "medicinalForms"
	| "indicationsAndDose"
>;

export interface DrugPageProps {
	data: {
		bnfDrug: QueryResult<
			WithSlugDeep<Except<FeedDrug, IgnoredDrugFields>, FeedBaseNamedPot>
		> &
			WithSlug<{
				indicationsAndDose: IndicationsAndDoseProps | null;
				constituentDrugs: {
					message: string;
					constituents: SlugAndTitle[];
				} | null;
				medicinalForms: {
					initialStatement: string;
					specialOrderManufacturersStatement: string | null;
					medicinalForms: WithSlug<{ form: string }>[];
				};
			}>;
	};
}

const DrugPage: FC<DrugPageProps> = ({ data: { bnfDrug } }) => {
	const { siteTitleShort } = useSiteMetadata(),
		titleNoHtml = striptags(bnfDrug.title),
		constituents = useMemo(
			() =>
				bnfDrug.constituentDrugs && {
					slug: "constituent-drugs",
					potName: "Constituent drugs",
					...bnfDrug.constituentDrugs,
				},
			[bnfDrug.constituentDrugs]
		),
		medicinalForms = useMemo(
			() => ({
				slug: "medicinal-forms",
				potName: "Medicinal forms",
				...bnfDrug.medicinalForms,
			}),
			[bnfDrug.medicinalForms]
		),
		/** Sections of a drug that have their own, specific component that isn't a `SimplePot` */
		nonSimplePotComponents = useMemo(() => {
			const { indicationsAndDose } = bnfDrug,
				potMap = new Map<BasePot | null, ElementType>();
			potMap.set(indicationsAndDose, IndicationsAndDose);
			// Bespoke sections that aren't "pots" in the feed
			potMap.set(constituents, Constituents);
			potMap.set(medicinalForms, MedicinalForms);
			return potMap;
		}, [bnfDrug, constituents, medicinalForms]);

	const orderedSections: BasePot[] = [
		constituents,
		bnfDrug.drugAction,
		bnfDrug.indicationsAndDose,
		bnfDrug.unlicensedUse,
		// TODO bnfDrug.importantSafetyInformation (BNF-1266)
		bnfDrug.contraIndications,
		bnfDrug.cautions,
		// TODO: Interactions (BNF-1268)
		bnfDrug.sideEffects,
		bnfDrug.allergyAndCrossSensitivity,
		bnfDrug.conceptionAndContraception,
		bnfDrug.pregnancy,
		bnfDrug.breastFeeding,
		bnfDrug.hepaticImpairment,
		bnfDrug.renalImpairment,
		bnfDrug.preTreatmentScreening,
		// TODO: bnfDrug.monitoringRequirements (BNF-1269)
		bnfDrug.effectOnLaboratoryTests,
		bnfDrug.treatmentCessation,
		bnfDrug.directionsForAdministration,
		bnfDrug.prescribingAndDispensingInformation,
		bnfDrug.palliativeCare,
		bnfDrug.handlingAndStorage,
		bnfDrug.patientAndCarerAdvice,
		bnfDrug.professionSpecificInformation,
		// TODO: bnfDrug.nationalFunding (BNF-1270)
		bnfDrug.lessSuitableForPrescribing,
		bnfDrug.exceptionsToLegalCategory,
		medicinalForms,
		// TODO: related treatment summaries (BNF-1212)
		// TODO: other drugs in class (BNF-1244)
	].filter(isTruthy);

	return (
		<Layout>
			<SEO
				title={`${titleNoHtml} | Drugs`}
				description={`Indications, dose, contra-indications, side-effects, interactions, cautions, warnings and other safety information for ${titleNoHtml}`}
			/>

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb to="/drugs/" elementType={Link}>
					Drugs
				</Breadcrumb>
				<Breadcrumb>{titleNoHtml}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={<span dangerouslySetInnerHTML={{ __html: bnfDrug.title }} />}
			/>

			<div className={styles.body}>
				<div className={styles.sectionNav}>
					<SectionNav
						sections={orderedSections.map(({ potName, slug }) => ({
							id: slug,
							title: potName,
						}))}
					/>
				</div>
				<div className={styles.aside}>
					<Panel>
						<h2 className="h5">Medicinal forms and&nbsp;pricing</h2>
						<p
							dangerouslySetInnerHTML={{
								__html: bnfDrug.medicinalForms.initialStatement,
							}}
						/>
						{bnfDrug.medicinalForms.medicinalForms.length > 0 ? (
							<>
								<p>
									<Link
										to={`/drugs/${bnfDrug.slug}/medicinal-forms/`}
										id="medicinal-forms-link"
									>
										View all medicinal forms and pricing information
									</Link>{" "}
								</p>
								<p>Or jump straight to:</p>
								<ul aria-labelledby="medicinal-forms-link">
									{bnfDrug.medicinalForms.medicinalForms.map(
										({ form, slug }) => (
											<li key={form}>
												<Link
													to={`/drugs/${bnfDrug.slug}/medicinal-forms/#${slug}`}
												>
													{form}
												</Link>
											</li>
										)
									)}
								</ul>
							</>
						) : null}
					</Panel>
				</div>
				<div className={styles.sections}>
					{orderedSections.map((section) => {
						// Default to a SimplePot as that's the most common type of section
						const Component = nonSimplePotComponents.get(section) || SimplePot;

						return (
							<Component
								key={section.potName}
								drugSlug={bnfDrug.slug}
								drugTitle={bnfDrug.title}
								{...section}
							/>
						);
					})}
				</div>
			</div>
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfDrug(id: { eq: $id }) {
			title
			slug
			interactant {
				title
				slug
			}
			constituentDrugs {
				message
				constituents {
					title
					slug
				}
			}
			allergyAndCrossSensitivity {
				...SimplePot
			}
			breastFeeding {
				...SimplePot
			}
			conceptionAndContraception {
				...SimplePot
			}
			contraIndications {
				...SimplePot
			}
			cautions {
				...SimplePot
			}
			directionsForAdministration {
				...SimplePot
			}
			drugAction {
				...SimplePot
			}
			effectOnLaboratoryTests {
				...SimplePot
			}
			exceptionsToLegalCategory {
				...SimplePot
			}
			handlingAndStorage {
				...SimplePot
			}
			hepaticImpairment {
				...SimplePot
			}
			importantSafetyInformation {
				...SimplePot
			}
			indicationsAndDose {
				potName
				slug
				drugClassContent {
					...IndicationsAndDoseContent
				}
				drugContent {
					...IndicationsAndDoseContent
				}
				prepContent {
					...IndicationsAndDoseContent
				}
			}
			lessSuitableForPrescribing {
				...SimplePot
			}
			medicinalForms {
				initialStatement
				specialOrderManufacturersStatement
				medicinalForms {
					form
					slug
				}
			}
			monitoringRequirements {
				potName
				slug
				drugClassContent {
					contentFor
					monitoringOfPatientParameters
					patientMonitoringProgrammes
					therapeuticDrugMonitoring
				}
				drugContent {
					contentFor
					monitoringOfPatientParameters
					patientMonitoringProgrammes
					therapeuticDrugMonitoring
				}
				prepContent {
					contentFor
					monitoringOfPatientParameters
					patientMonitoringProgrammes
					therapeuticDrugMonitoring
				}
			}
			nationalFunding {
				potName
				slug
				drugClassContent {
					...NationalFundingContent
				}
				drugContent {
					...NationalFundingContent
				}
				prepContent {
					...NationalFundingContent
				}
			}
			palliativeCare {
				...SimplePot
			}
			patientAndCarerAdvice {
				...SimplePot
			}
			preTreatmentScreening {
				...SimplePot
			}
			pregnancy {
				...SimplePot
			}
			prescribingAndDispensingInformation {
				...SimplePot
			}
			professionSpecificInformation {
				...SimplePot
			}
			renalImpairment {
				...SimplePot
			}
			sideEffects {
				...SimplePot
			}
			treatmentCessation {
				...SimplePot
			}
			unlicensedUse {
				...SimplePot
			}
		}
	}
`;

export default DrugPage;
