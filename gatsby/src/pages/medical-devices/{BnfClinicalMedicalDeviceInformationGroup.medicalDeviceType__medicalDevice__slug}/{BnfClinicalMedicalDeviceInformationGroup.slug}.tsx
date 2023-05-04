import { graphql, Link } from "gatsby";
import { type FC } from "react";
import striptags from "striptags";

import {
	FeedIndicationsAndDosePotContent,
	type FeedPrep,
} from "@nice-digital/gatsby-source-bnf";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import {
	type BasePot,
	IndicationsAndDoseContent,
} from "@/components/DrugSections";
import { MedicalDevicePrepsSection } from "@/components/MedicalDevicePrepsSection/MedicalDevicePrepsSection";
import { Menu } from "@/components/Menu/Menu";
import { SectionLink } from "@/components/SectionNav/SectionNav";
import { NEWSEO } from "@/components/SEO/NEWSEO";
import {
	decapitalize,
	isTruthy,
	type WithSlug,
	type QueryResult,
} from "@/utils";

import styles from "./{BnfClinicalMedicalDeviceInformationGroup.slug}.module.scss";

interface CMPISimplePotProps {
	potName: string;
	slug: string;
	content: {
		contentFor: string;
		slug: string;
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
						content: QueryResult<WithSlug<FeedIndicationsAndDosePotContent>>;
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

export function Head({
	data: { bnfClinicalMedicalDeviceInformationGroup },
}: CMPIPageProps): JSX.Element {
	const { title } = bnfClinicalMedicalDeviceInformationGroup,
		medicalDeviceTitleNoHtml = striptags(
			bnfClinicalMedicalDeviceInformationGroup.medicalDeviceType.medicalDevice
				.title
		);

	const titleNoHtml = striptags(title),
		/** The ancestors from the parent page e.g. ["About"] */
		parentTitleParts = [medicalDeviceTitleNoHtml, "Medical devices"];

	return (
		<NEWSEO
			title={[titleNoHtml, ...parentTitleParts].filter(Boolean).join(" | ")}
			description={`This medical devices topic describes the options that are currently recommended for ${decapitalize(
				titleNoHtml
			)}.`}
		/>
	);
}

const CMPIPage: FC<CMPIPageProps> = ({
	data: {
		bnfClinicalMedicalDeviceInformationGroup: {
			title,
			medicalDeviceType: {
				clinicalMedicalDeviceInformationGroups,
				medicalDevice,
				title: medicalDeviceTypeTitle,
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
	const medicalDeviceTitleNoHtml = striptags(medicalDevice.title);

	return (
		<DetailsPageLayout
			preheading={`${medicalDeviceTypeTitle}: `}
			titleHtml={title}
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
			menu={() => (
				<Menu
					label={medicalDeviceTitleNoHtml}
					ariaLabel={medicalDeviceTitleNoHtml}
					link={{
						destination: `/medical-devices/${medicalDevice.slug}/`,
						elementType: Link,
					}}
					pages={clinicalMedicalDeviceInformationGroups.map((cmpi) => ({
						title: cmpi.title,
						href: `/medical-devices/${medicalDevice.slug}/${cmpi.slug}/`,
					}))}
				></Menu>
			)}
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
