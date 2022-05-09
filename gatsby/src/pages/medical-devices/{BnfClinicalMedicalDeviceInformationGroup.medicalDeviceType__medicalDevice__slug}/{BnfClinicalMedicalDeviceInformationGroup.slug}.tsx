import { useLocation } from "@reach/router";
import { graphql, Link } from "gatsby";
import { FC } from "react";
import striptags from "striptags";

import {
	FeedIndicationsAndDosePotContent,
	type FeedPrep,
} from "@nice-digital/gatsby-source-bnf";
import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import {
	type BasePot,
	IndicationsAndDoseContent,
} from "@/components/DrugSections";
import { MedicalDevicePrepsSection } from "@/components/MedicalDevicePrepsSection/MedicalDevicePrepsSection";
import { SectionLink } from "@/components/SectionNav/SectionNav";
import { isTruthy, type QueryResult } from "@/utils";

import styles from "./{BnfClinicalMedicalDeviceInformationGroup.slug}.module.scss";

interface CMPISimplePotProps {
	potName: string;
	slug: string;
	content: {
		contentFor: string;
		content: string;
	};
}

export interface CMPIPageProps {
	data: {
		bnfClinicalMedicalDeviceInformationGroup: {
			title: string;
			medicalDeviceType: {
				title: string;
				slug: string;
				clinicalMedicalDeviceInformationGroups: {
					title: string;
					slug: string;
				}[];
				medicalDevice: {
					title: string;
					slug: string;
				};
			};
			preparations: QueryResult<FeedPrep>[];
			allergyAndCrossSensitivity: CMPISimplePotProps | null;
			complianceStandards: CMPISimplePotProps | null;
			deviceDescription: CMPISimplePotProps | null;
			indicationsAndDose:
				| (BasePot & {
						content: QueryResult<FeedIndicationsAndDosePotContent>;
				  })
				| null;
			patientAndCarerAdvice: CMPISimplePotProps | null;
			prescribingAndDispensingInformation: CMPISimplePotProps | null;
			professionSpecificInformation: CMPISimplePotProps | null;
			treatmentCessation: CMPISimplePotProps | null;
		};
	};
}

const CMPISimplePot: FC<CMPISimplePotProps> = ({
	potName,
	slug,
	content: { content },
}) => (
	<section aria-labelledby={slug}>
		<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />
		<div dangerouslySetInnerHTML={{ __html: content }} />
	</section>
);

const getSimplePotSectionLink = (
	pot: CMPISimplePotProps | null
): SectionLink | undefined =>
	pot
		? {
				id: pot.slug,
				title: pot.potName,
		  }
		: undefined;

const CMPIPage: FC<CMPIPageProps> = ({
	data: {
		bnfClinicalMedicalDeviceInformationGroup: {
			title,
			medicalDeviceType: {
				clinicalMedicalDeviceInformationGroups,
				medicalDevice,
			},
			preparations,
			allergyAndCrossSensitivity,
			complianceStandards,
			deviceDescription,
			indicationsAndDose,
			patientAndCarerAdvice,
			prescribingAndDispensingInformation,
			professionSpecificInformation,
			treatmentCessation,
		},
	},
}) => {
	const { pathname } = useLocation(),
		titleNoHtml = striptags(title),
		medicalDeviceTitleNoHtml = striptags(medicalDevice.title);

	return (
		<DetailsPageLayout
			titleHtml={title}
			metaDescription={`This medical devices topic describes the options that are currently recommended for ${titleNoHtml}.`}
			parentTitleParts={[medicalDeviceTitleNoHtml, "Medical devices"]}
			parentBreadcrumbs={[
				{
					text: "Medical devices",
					href: "/medical-devices/",
				},
				{
					text: medicalDeviceTitleNoHtml,
					href: `/medical-devices/${medicalDevice.slug}/`,
				},
			]}
			menu={
				clinicalMedicalDeviceInformationGroups.length > 1
					? () => (
							<StackedNav
								aria-label={medicalDeviceTitleNoHtml}
								label={medicalDeviceTitleNoHtml}
								link={{
									destination: `/medical-devices/${medicalDevice.slug}/`,
									elementType: Link,
								}}
							>
								{clinicalMedicalDeviceInformationGroups.map((cmpi) => {
									const pagePath = `/medical-devices/${medicalDevice.slug}/${cmpi.slug}/`;
									return (
										<StackedNavLink
											key={cmpi.title}
											destination={pagePath}
											elementType={Link}
											isCurrent={pathname === pagePath}
										>
											<span dangerouslySetInnerHTML={{ __html: cmpi.title }} />
										</StackedNavLink>
									);
								})}
							</StackedNav>
					  )
					: undefined
			}
			useSectionNav
			sections={[
				getSimplePotSectionLink(deviceDescription),
				indicationsAndDose
					? {
							id: indicationsAndDose.slug,
							title: indicationsAndDose.potName,
					  }
					: undefined,
				getSimplePotSectionLink(allergyAndCrossSensitivity),
				getSimplePotSectionLink(treatmentCessation),
				getSimplePotSectionLink(prescribingAndDispensingInformation),
				getSimplePotSectionLink(patientAndCarerAdvice),
				getSimplePotSectionLink(professionSpecificInformation),
				getSimplePotSectionLink(complianceStandards),
				preparations.length > 0
					? { id: "medical-device-types", title: "Medical device types" }
					: undefined,
			].filter(isTruthy)}
		>
			<div className={styles.sections}>
				{deviceDescription && <CMPISimplePot {...deviceDescription} />}
				{indicationsAndDose && (
					<section aria-labelledby={indicationsAndDose.slug}>
						<h2
							id={indicationsAndDose.slug}
							dangerouslySetInnerHTML={{ __html: indicationsAndDose.potName }}
						/>
						<IndicationsAndDoseContent
							collapsible={false}
							content={indicationsAndDose.content}
						/>
					</section>
				)}
				{allergyAndCrossSensitivity && (
					<CMPISimplePot {...allergyAndCrossSensitivity} />
				)}
				{treatmentCessation && <CMPISimplePot {...treatmentCessation} />}
				{prescribingAndDispensingInformation && (
					<CMPISimplePot {...prescribingAndDispensingInformation} />
				)}
				{patientAndCarerAdvice && <CMPISimplePot {...patientAndCarerAdvice} />}
				{professionSpecificInformation && (
					<CMPISimplePot {...professionSpecificInformation} />
				)}
				{complianceStandards && <CMPISimplePot {...complianceStandards} />}
				{preparations.length > 0 ? (
					<MedicalDevicePrepsSection preps={preparations} />
				) : null}
			</div>
		</DetailsPageLayout>
	);
};

export const query = graphql`
	fragment CMPISimplePot on BnfMedicalDeviceSimplePot {
		potName
		slug
		content {
			contentFor
			content
		}
	}
	query ($id: String) {
		bnfClinicalMedicalDeviceInformationGroup(id: { eq: $id }) {
			title
			medicalDeviceType {
				title
				slug
				clinicalMedicalDeviceInformationGroups {
					title
					slug
				}
				medicalDevice {
					title
					slug
				}
			}
			preparations {
				...FullPrep
			}
			allergyAndCrossSensitivity {
				...CMPISimplePot
			}
			complianceStandards {
				...CMPISimplePot
			}
			deviceDescription {
				...CMPISimplePot
			}
			indicationsAndDose {
				potName
				slug
				content {
					...IndicationsAndDoseContent
				}
			}
			patientAndCarerAdvice {
				...CMPISimplePot
			}
			prescribingAndDispensingInformation {
				...CMPISimplePot
			}
			professionSpecificInformation {
				...CMPISimplePot
			}
			treatmentCessation {
				...CMPISimplePot
			}
		}
	}
`;

export default CMPIPage;