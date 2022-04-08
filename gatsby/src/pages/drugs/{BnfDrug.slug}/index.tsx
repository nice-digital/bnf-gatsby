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
	SimplePot,
	IndicationsAndDose,
	type IndicationsAndDoseProps,
	Monitoring,
	NationalFunding,
	type BasePot,
	ImportantSafetyInfo,
} from "@/components/DrugSections";
import { Constituents } from "@/components/DrugSections/Constituents/Constituents";
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

type IgnoredDrugFields = keyof Pick<
	FeedDrug,
	| "id"
	| "sid"
	| "primaryClassification"
	| "secondaryClassifications"
	| "reviewDate"
	| "constituentDrugs"
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
		/** Sections of a drug that have their own, specific component that isn't a `SimplePot` */
		nonSimplePotComponents = useMemo(() => {
			const {
					importantSafetyInformation,
					indicationsAndDose,
					monitoringRequirements,
					nationalFunding,
				} = bnfDrug,
				potMap = new Map<BasePot | null, ElementType>();
			potMap.set(nationalFunding, NationalFunding);
			potMap.set(indicationsAndDose, IndicationsAndDose);
			potMap.set(importantSafetyInformation, ImportantSafetyInfo);
			potMap.set(monitoringRequirements, Monitoring);
			// Bespoke sections that aren't "pots" in the feed
			potMap.set(constituents, Constituents);
			return potMap;
		}, [bnfDrug, constituents]);

	const orderedSections: BasePot[] = [
		constituents,
		bnfDrug.drugAction,
		bnfDrug.indicationsAndDose,
		bnfDrug.unlicensedUse,
		bnfDrug.importantSafetyInformation,
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
		bnfDrug.monitoringRequirements,
		bnfDrug.effectOnLaboratoryTests,
		bnfDrug.treatmentCessation,
		bnfDrug.directionsForAdministration,
		bnfDrug.prescribingAndDispensingInformation,
		bnfDrug.palliativeCare,
		bnfDrug.handlingAndStorage,
		bnfDrug.patientAndCarerAdvice,
		bnfDrug.professionSpecificInformation,
		bnfDrug.nationalFunding,
		bnfDrug.lessSuitableForPrescribing,
		bnfDrug.exceptionsToLegalCategory,
		// TODO: medicinalForms (BNF-1267)
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
