import { graphql, Link } from "gatsby";
import { FC } from "react";
import striptags from "striptags";

import { type FeedPrep } from "@nice-digital/gatsby-source-bnf";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { MedicalDevicePrepsSection } from "@/components/MedicalDevicePrepsSection/MedicalDevicePrepsSection";
import { SectionLink, SectionNav } from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { decapitalize, type QueryResult } from "@/utils";

interface CMPISimplePot {
	potName: string;
	slug: string;
	contentFor: string;
	content: string;
}

export interface CMPIPageProps {
	data: {
		bnfClinicalMedicalDeviceInformationGroup: {
			title: string;
			medicalDeviceType: {
				medicalDevice: {
					title: string;
					slug: string;
				};
			};
			preparations: QueryResult<FeedPrep>[];
			allergyAndCrossSensitivity: CMPISimplePot | null;
			complianceStandards: CMPISimplePot | null;
			deviceDescription: CMPISimplePot | null;
			patientAndCarerAdvice: CMPISimplePot | null;
			prescribingAndDispensingInformation: CMPISimplePot | null;
			professionSpecificInformation: CMPISimplePot | null;
			treatmentCessation: CMPISimplePot | null;
		};
	};
}

const SimplePot = ({ slug, content, potName }: CMPISimplePot) => (
	<section aria-labelledby={slug}>
		<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />
		<div dangerouslySetInnerHTML={{ __html: content }} />
	</section>
);

const getSimplePotSectionLink = (
	pot: CMPISimplePot | null
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
			medicalDeviceType: { medicalDevice },
			preparations,
			allergyAndCrossSensitivity,
			complianceStandards,
			deviceDescription,
			patientAndCarerAdvice,
			prescribingAndDispensingInformation,
			professionSpecificInformation,
			treatmentCessation,
		},
	},
}) => {
	const { siteTitleShort } = useSiteMetadata(),
		titleNoHtml = striptags(title),
		medicalDeviceTitleNoHtml = striptags(medicalDevice.title);

	return (
		<Layout>
			<SEO
				title={`${titleNoHtml} | ${medicalDeviceTitleNoHtml} | Medical devices`}
				description={`This medical devices topic describes the options that are currently recommended for ${titleNoHtml}.`}
			/>

			<Breadcrumbs>
				<Breadcrumb key="NICE" to="https://www.nice.org.uk/">
					NICE
				</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb to="/medical-devices/" elementType={Link}>
					Medical devices
				</Breadcrumb>
				<Breadcrumb
					to={`/medical-devices/${medicalDevice.slug}/`}
					elementType={Link}
				>
					{medicalDeviceTitleNoHtml}
				</Breadcrumb>
				<Breadcrumb>{titleNoHtml}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={<span dangerouslySetInnerHTML={{ __html: title }} />}
				lead={
					<Link to={`/medical-devices/${medicalDevice.slug}/`}>
						View other {decapitalize(medicalDeviceTitleNoHtml)}
					</Link>
				}
			/>

			<SectionNav
				sections={[
					getSimplePotSectionLink(deviceDescription),
					getSimplePotSectionLink(allergyAndCrossSensitivity),
					getSimplePotSectionLink(treatmentCessation),
					getSimplePotSectionLink(prescribingAndDispensingInformation),
					getSimplePotSectionLink(patientAndCarerAdvice),
					getSimplePotSectionLink(professionSpecificInformation),
					getSimplePotSectionLink(complianceStandards),
					preparations.length > 0
						? { id: "medical-device-types", title: "Medical device types" }
						: undefined,
				]}
			/>

			{deviceDescription && <SimplePot {...deviceDescription} />}
			{/* TODO: Indications and dose */}
			{allergyAndCrossSensitivity && (
				<SimplePot {...allergyAndCrossSensitivity} />
			)}
			{treatmentCessation && <SimplePot {...treatmentCessation} />}
			{prescribingAndDispensingInformation && (
				<SimplePot {...prescribingAndDispensingInformation} />
			)}
			{patientAndCarerAdvice && <SimplePot {...patientAndCarerAdvice} />}
			{professionSpecificInformation && (
				<SimplePot {...professionSpecificInformation} />
			)}
			{complianceStandards && <SimplePot {...complianceStandards} />}
			{preparations.length > 0 ? (
				<MedicalDevicePrepsSection preps={preparations} />
			) : null}
		</Layout>
	);
};

export const query = graphql`
	fragment CMPISimplePot on BnfMedicalDeviceSimplePot {
		potName
		slug
		contentFor
		content
	}
	query ($id: String) {
		bnfClinicalMedicalDeviceInformationGroup(id: { eq: $id }) {
			title
			medicalDeviceType {
				medicalDevice {
					title
					slug
				}
				title
				slug
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
