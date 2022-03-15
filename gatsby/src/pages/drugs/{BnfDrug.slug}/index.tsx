import { graphql, Link } from "gatsby";
import React, { ElementType, FC } from "react";
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
	ConstituentDrugs,
	type ConstituentDrugsProps,
} from "@/components/DrugSections/ConstituentDrugs/ConstituentDrugs";
import { SimplePot } from "@/components/DrugSections/SimplePot/SimplePot";
import {
	IndicationsAndDose,
	type IndicationsAndDoseProps,
} from "@/components/IndicationsAndDose/IndicationsAndDose";
import { Layout } from "@/components/Layout/Layout";
import { SectionNav } from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

type PotWithSlug = FeedBaseNamedPot & {
	slug: string;
};

type DrugWithSluggedPots = {
	[Key in keyof FeedDrug]-?: FeedDrug[Key] extends FeedBaseNamedPot | undefined
		? (FeedDrug[Key] & PotWithSlug) | null
		: FeedDrug[Key];
};

export interface DrugPageProps {
	data: {
		bnfDrug: Except<DrugWithSluggedPots, "constituentDrugs"> & {
			slug: string;
			interactant: null | {
				title: string;
				slug: string;
			};
			constituentDrugs: null | ConstituentDrugsProps;
			indicationsAndDose?: IndicationsAndDoseProps["indicationsAndDose"];
		};
	};
}

const DrugPage: FC<DrugPageProps> = ({
	data: {
		bnfDrug: {
			title,
			slug,
			interactant,
			constituentDrugs,
			indicationsAndDose,
			allergyAndCrossSensitivity,
			breastFeeding,
			conceptionAndContraception,
			contraIndications,
			cautions,
			directionsForAdministration,
			drugAction,
			effectOnLaboratoryTests,
			exceptionsToLegalCategory,
			handlingAndStorage,
			hepaticImpairment,
			importantSafetyInformation,
			lessSuitableForPrescribing,
			palliativeCare,
			patientAndCarerAdvice,
			preTreatmentScreening,
			pregnancy,
			prescribingAndDispensingInformation,
			professionSpecificInformation,
			renalImpairment,
			sideEffects,
			treatmentCessation,
			unlicensedUse,
		},
	},
}) => {
	const { siteTitleShort } = useSiteMetadata(),
		titleNoHtml = striptags(title);

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

			<Grid gutter="loose">
				<GridItem cols={12} md={8} lg={9} className="hide-print">
					<SectionNav
						sections={[
							indicationsAndDose && {
								id: indicationsAndDose.slug,
								title: indicationsAndDose.potName,
							},
						]}
					/>
				</GridItem>
				<GridItem cols={12} md={4} lg={3} className="hide-print">
					<Panel>Quick links will go here</Panel>
				</GridItem>
				<GridItem cols={12} md={8} lg={9}>
					{interactant && (
						<p>
							<Link to={`/interactions/${interactant.slug}/`}>
								View interactions page for {interactant.title}
							</Link>
						</p>
					)}

					{constituentDrugs && <ConstituentDrugs {...constituentDrugs} />}
					{drugAction && <SimplePot {...drugAction} />}
					{indicationsAndDose && (
						<IndicationsAndDose indicationsAndDose={indicationsAndDose} />
					)}
					{unlicensedUse && <SimplePot {...unlicensedUse} />}
					{importantSafetyInformation && (
						<SimplePot {...importantSafetyInformation} />
					)}
					{contraIndications && <SimplePot {...contraIndications} />}
					{cautions && <SimplePot {...cautions} />}
					{/* TODO Interactions */}
					{sideEffects && <SimplePot {...sideEffects} />}
					{allergyAndCrossSensitivity && (
						<SimplePot {...allergyAndCrossSensitivity} />
					)}
					{conceptionAndContraception && (
						<SimplePot {...conceptionAndContraception} />
					)}
					{pregnancy && <SimplePot {...pregnancy} />}
					{breastFeeding && <SimplePot {...breastFeeding} />}
					{hepaticImpairment && <SimplePot {...hepaticImpairment} />}
					{renalImpairment && <SimplePot {...renalImpairment} />}
					{preTreatmentScreening && <SimplePot {...preTreatmentScreening} />}
					{/* TODO Monitoring */}
					{effectOnLaboratoryTests && (
						<SimplePot {...effectOnLaboratoryTests} />
					)}
					{treatmentCessation && <SimplePot {...treatmentCessation} />}
					{directionsForAdministration && (
						<SimplePot {...directionsForAdministration} />
					)}
					{prescribingAndDispensingInformation && (
						<SimplePot {...prescribingAndDispensingInformation} />
					)}
					{handlingAndStorage && <SimplePot {...handlingAndStorage} />}
					{patientAndCarerAdvice && <SimplePot {...patientAndCarerAdvice} />}
					{palliativeCare && <SimplePot {...palliativeCare} />}
					{professionSpecificInformation && (
						<SimplePot {...professionSpecificInformation} />
					)}
					{/* TODO National funding */}
					{exceptionsToLegalCategory && (
						<SimplePot {...exceptionsToLegalCategory} />
					)}
					{lessSuitableForPrescribing && (
						<SimplePot {...lessSuitableForPrescribing} />
					)}
					{/* TODO Medicinal forms */}

					<p>
						<Link to={`/drugs/${slug}/medicinal-forms/`}>Medicinal forms</Link>
					</p>
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
