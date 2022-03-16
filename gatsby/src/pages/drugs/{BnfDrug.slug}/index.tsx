import { graphql, Link } from "gatsby";
import React, { useMemo, type ElementType, type FC } from "react";
import striptags from "striptags";
import { type Merge, type Except, type SetRequired } from "type-fest";

import {
	type FeedDrug,
	type FeedBaseNamedPot,
	type FeedMedicinalForms,
} from "@nice-digital/gatsby-source-bnf";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Panel } from "@nice-digital/nds-panel";

import {
	Constituents,
	ImportantSafetyInfo,
	MedicinalForms,
	Monitoring,
	NationalFunding,
	SimplePot,
	IndicationsAndDose,
	type IndicationsAndDoseProps,
} from "@/components/DrugSections";
import { Layout } from "@/components/Layout/Layout";
import { SectionNav } from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useIsTruthy } from "@/hooks/useIsTruthy";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import { type SlugAndTitle, type PotWithSlug, type WithSlug } from "src/types";

/**
 * Utility type with slug property added to all 'pots' on a drug.
 *
 * This ie because we re-use the raw `FeedDrug` type to avoid having to redeclare each and every drug field.
 * But we add `slug` fields to pots when we create GraphQL nodes, so we add the `slug` property here.
 *
 * We also swap `undefined` to `null` because the feed misses out empty properties (`undefined`) but when we query
 * them with GraphQL they come back as `null` instead.
 * */
type DrugWithSluggedPots = {
	[Key in keyof FeedDrug]-?: FeedDrug[Key] extends FeedBaseNamedPot | undefined
		? (FeedDrug[Key] & PotWithSlug) | null
		: FeedDrug[Key];
};

/** Ignore fields on a drug that we don't query and don't need */
type IgnoredDrugFields =
	| "id"
	| "sid"
	| "primaryClassification"
	| "secondaryClassifications"
	| "reviewDate";

export interface DrugPageProps {
	data: {
		bnfDrug: Merge<
			Except<WithSlug<DrugWithSluggedPots>, IgnoredDrugFields>,
			{
				interactant: SlugAndTitle | null;
				constituentDrugs: {
					message: string;
					constituents: SlugAndTitle[];
				} | null;
				indicationsAndDose: IndicationsAndDoseProps | null;
				medicinalForms: SetRequired<FeedMedicinalForms, "medicinalForms">;
			}
		>;
	};
}

const DrugPage: FC<DrugPageProps> = ({ data: { bnfDrug } }) => {
	const isTruthy = useIsTruthy(),
		{ siteTitleShort } = useSiteMetadata(),
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
			const {
					indicationsAndDose,
					monitoringRequirements,
					nationalFunding,
					importantSafetyInformation,
				} = bnfDrug,
				potMap = new Map<PotWithSlug | null, ElementType>();
			potMap.set(indicationsAndDose, IndicationsAndDose);
			potMap.set(monitoringRequirements, Monitoring);
			potMap.set(nationalFunding, NationalFunding);
			potMap.set(importantSafetyInformation, ImportantSafetyInfo);
			// Bespoke sections that aren't "pots" in the feed
			potMap.set(medicinalForms, MedicinalForms);
			potMap.set(constituents, Constituents);
			return potMap;
		}, [bnfDrug, medicinalForms, constituents]);

	const orderedSections: PotWithSlug[] = [
		constituents,
		bnfDrug.drugAction,
		bnfDrug.indicationsAndDose,
		bnfDrug.unlicensedUse,
		bnfDrug.importantSafetyInformation,
		bnfDrug.contraIndications,
		bnfDrug.cautions,
		// TODO: Interactions
		bnfDrug.sideEffects,
		bnfDrug.allergyAndCrossSensitivity,
		bnfDrug.conceptionAndContraception,
		bnfDrug.pregnancy,
		bnfDrug.breastFeeding,
		bnfDrug.hepaticImpairment,
		bnfDrug.renalImpairment,
		bnfDrug.preTreatmentScreening,
		bnfDrug.monitoringRequirements,
		bnfDrug.effectOnLaboratoryTests,
		bnfDrug.treatmentCessation,
		bnfDrug.directionsForAdministration,
		bnfDrug.prescribingAndDispensingInformation,
		bnfDrug.handlingAndStorage,
		bnfDrug.patientAndCarerAdvice,
		bnfDrug.palliativeCare,
		bnfDrug.professionSpecificInformation,
		bnfDrug.nationalFunding,
		bnfDrug.exceptionsToLegalCategory,
		bnfDrug.lessSuitableForPrescribing,
		medicinalForms,
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

			<Grid gutter="loose">
				<GridItem cols={12} md={8} lg={9} className="hide-print">
					<SectionNav
						sections={orderedSections.map(({ potName, slug }) => ({
							id: slug,
							title: potName,
						}))}
					/>
				</GridItem>
				<GridItem cols={12} md={4} lg={3} className="hide-print">
					<Panel>Quick links will go here</Panel>
				</GridItem>
				<GridItem cols={12} md={8} lg={9}>
					{/* {interactant && (
						<p>
							<Link to={`/interactions/${interactant.slug}/`}>
								View interactions page for {interactant.title}
							</Link>
						</p>
					)} */}
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
				</GridItem>
			</Grid>
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
