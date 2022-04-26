import { graphql, Link } from "gatsby";
import React, { useMemo, type ElementType, type FC } from "react";
import striptags from "striptags";
import { type Except } from "type-fest";

import {
	type FeedDrug,
	type FeedBaseNamedPot,
} from "@nice-digital/gatsby-source-bnf";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Panel } from "@nice-digital/nds-panel";

import {
	Constituents,
	SimplePot,
	IndicationsAndDose,
	type IndicationsAndDoseProps,
	MedicinalForms,
	Monitoring,
	NationalFunding,
	type BasePot,
	MedicinalFormsContent,
	ImportantSafetyInfo,
	RelatedTreatmentSummaries,
	DrugsInClass,
	Classification,
	Interactions,
	InteractionsContent,
} from "@/components/DrugSections";
import { Layout } from "@/components/Layout/Layout";
import { SectionNav } from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import {
	isTruthy,
	type WithSlug,
	type WithSlugDeep,
	type QueryResult,
	type SlugAndTitle,
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
	| "interactants"
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
				relatedTreatmentSummaries: SlugAndTitle[];
				medicinalForms: {
					initialStatement: string;
					specialOrderManufacturersStatement: string | null;
					medicinalForms: WithSlug<{ form: string }>[];
				};
				primaryClassification: Classification | null;
				secondaryClassifications: Classification[];
				interactants: SlugAndTitle[];
			}>;
	};
}

const DrugPage: FC<DrugPageProps> = ({
	data: {
		bnfDrug: {
			slug,
			title,
			primaryClassification,
			secondaryClassifications,
			constituentDrugs,
			importantSafetyInformation,
			indicationsAndDose,
			interactants,
			medicinalForms,
			monitoringRequirements,
			nationalFunding,
			relatedTreatmentSummaries,
			...bnfDrug
		},
	},
}) => {
	const { siteTitleShort } = useSiteMetadata(),
		titleNoHtml = striptags(title),
		constituentsSection = useMemo(
			() =>
				constituentDrugs && {
					slug: "constituent-drugs",
					potName: "Constituent drugs",
					...constituentDrugs,
				},
			[constituentDrugs]
		),
		interactionsSection = useMemo(
			() =>
				interactants.length > 0
					? {
							slug: "interactions",
							potName: "Interactions",
							interactants,
					  }
					: null,
			[interactants]
		),
		medicinalFormsSection = useMemo(
			() => ({
				slug: "medicinal-forms",
				potName: "Medicinal forms",
				...medicinalForms,
			}),
			[medicinalForms]
		),
		relatedTreatmentSummariesSection = useMemo(
			() =>
				relatedTreatmentSummaries.length > 0
					? {
							slug: "related-treatment-summaries",
							potName: "Related treatment summaries",
							relatedTreatmentSummaries,
					  }
					: null,
			[relatedTreatmentSummaries]
		),
		otherDrugsInClassSection = useMemo(
			() =>
				(primaryClassification &&
					primaryClassification.drugs.some((d) => d.slug !== slug)) ||
				secondaryClassifications.some((sC) =>
					sC.drugs.some((d) => d.slug !== slug)
				)
					? {
							potName: "Other drugs in class",
							slug: "other-drugs-in-class",
							primaryClassification,
							secondaryClassifications,
					  }
					: null,
			[primaryClassification, secondaryClassifications, slug]
		),
		/** Sections of a drug that have their own, specific component that isn't a `SimplePot` */
		nonSimplePotComponents = useMemo(() => {
			const potMap = new Map<BasePot | null, ElementType>();
			potMap.set(nationalFunding, NationalFunding);
			potMap.set(indicationsAndDose, IndicationsAndDose);
			potMap.set(importantSafetyInformation, ImportantSafetyInfo);
			potMap.set(monitoringRequirements, Monitoring);
			// Bespoke sections that aren't "pots" in the feed
			potMap.set(constituentsSection, Constituents);
			potMap.set(interactionsSection, Interactions);
			potMap.set(medicinalFormsSection, MedicinalForms);
			potMap.set(relatedTreatmentSummariesSection, RelatedTreatmentSummaries);
			potMap.set(otherDrugsInClassSection, DrugsInClass);
			return potMap;
		}, [
			constituentsSection,
			importantSafetyInformation,
			indicationsAndDose,
			interactionsSection,
			medicinalFormsSection,
			monitoringRequirements,
			nationalFunding,
			relatedTreatmentSummariesSection,
			otherDrugsInClassSection,
		]);

	const orderedSections: BasePot[] = [
		constituentsSection,
		bnfDrug.drugAction,
		indicationsAndDose,
		bnfDrug.unlicensedUse,
		importantSafetyInformation,
		bnfDrug.contraIndications,
		bnfDrug.cautions,
		interactionsSection,
		bnfDrug.sideEffects,
		bnfDrug.allergyAndCrossSensitivity,
		bnfDrug.conceptionAndContraception,
		bnfDrug.pregnancy,
		bnfDrug.breastFeeding,
		bnfDrug.hepaticImpairment,
		bnfDrug.renalImpairment,
		bnfDrug.preTreatmentScreening,
		monitoringRequirements,
		bnfDrug.effectOnLaboratoryTests,
		bnfDrug.treatmentCessation,
		bnfDrug.directionsForAdministration,
		bnfDrug.prescribingAndDispensingInformation,
		bnfDrug.palliativeCare,
		bnfDrug.handlingAndStorage,
		bnfDrug.patientAndCarerAdvice,
		bnfDrug.professionSpecificInformation,
		nationalFunding,
		bnfDrug.lessSuitableForPrescribing,
		bnfDrug.exceptionsToLegalCategory,
		medicinalFormsSection,
		relatedTreatmentSummariesSection,
		otherDrugsInClassSection,
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
				heading={<span dangerouslySetInnerHTML={{ __html: title }} />}
			/>

			<div className={styles.contentWrapper}>
				<div className={styles.sectionNav}>
					<SectionNav
						sections={orderedSections.map(({ potName, slug }) => ({
							id: slug,
							title: potName,
						}))}
					/>
				</div>
				<div className={styles.aside}>
					{interactionsSection ? (
						<Panel>
							<h2 className="h5">Interactions</h2>
							<InteractionsContent
								interactants={interactionsSection.interactants}
							/>
						</Panel>
					) : null}
					<Panel data-tracking="medicinal-forms-panel">
						<h2 className="h5">Medicinal forms and&nbsp;pricing</h2>
						<MedicinalFormsContent
							drug={{ slug, title }}
							{...medicinalFormsSection}
						/>
					</Panel>
				</div>
				<div className={styles.sections}>
					{orderedSections.map((section) => {
						// Default to a SimplePot as that's the most common type of section
						const Component = nonSimplePotComponents.get(section) || SimplePot;

						return (
							<Component
								key={section.potName}
								drug={{ slug, title }}
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
			primaryClassification {
				title: name
				slug
				order
				drugs {
					title
					slug
				}
			}
			secondaryClassifications {
				title: name
				slug
				order
				drugs {
					title
					slug
				}
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
			constituentDrugs {
				message
				constituents {
					title
					slug
				}
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
			interactants {
				title
				slug
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
			relatedTreatmentSummaries {
				title
				slug
			}
			unlicensedUse {
				...SimplePot
			}
		}
	}
`;

export default DrugPage;
