import { graphql, Link } from "gatsby";
import { FC } from "react";
import striptags from "striptags";

import { type FeedPrep } from "@nice-digital/gatsby-source-bnf";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { MedicalDevicePrepsSection } from "@/components/MedicalDevicePrepsSection/MedicalDevicePrepsSection";
import { SectionNav } from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { type QueryResult } from "@/utils";

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
			deviceDescription: CMPISimplePot | null;
			patientAndCarerAdvice: CMPISimplePot | null;
			prescribingAndDispensingInformation: CMPISimplePot | null;
			professionSpecificInformation: CMPISimplePot | null;
			preparations: QueryResult<FeedPrep>[];
		};
	};
}

const SimplePot = ({ slug, content, potName }: CMPISimplePot) => (
	<section aria-labelledby={slug}>
		<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />
		<div dangerouslySetInnerHTML={{ __html: content }} />
	</section>
);

const CMPIPage: FC<CMPIPageProps> = ({
	data: {
		bnfClinicalMedicalDeviceInformationGroup: {
			title,
			medicalDeviceType: { medicalDevice },
			deviceDescription,
			patientAndCarerAdvice,
			prescribingAndDispensingInformation,
			professionSpecificInformation,
			preparations,
		},
	},
}) => {
	const { siteTitleShort } = useSiteMetadata(),
		titleNoHtml = striptags(title);

	return (
		<Layout>
			<SEO
				title={`${titleNoHtml} | ${medicalDevice.title} | Medical devices`}
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
					{medicalDevice.title}
				</Breadcrumb>
				<Breadcrumb>{titleNoHtml}</Breadcrumb>
			</Breadcrumbs>
			<PageHeader
				id="content-start"
				lead={
					<Link to={`/medical-devices/${medicalDevice.slug}/`}>
						View other{" "}
						<span dangerouslySetInnerHTML={{ __html: medicalDevice.title }} />
					</Link>
				}
				heading={<span dangerouslySetInnerHTML={{ __html: title }} />}
			/>
			<SectionNav
				sections={[
					deviceDescription
						? {
								id: deviceDescription.slug,
								title: deviceDescription.potName,
						  }
						: undefined,
					prescribingAndDispensingInformation
						? {
								id: prescribingAndDispensingInformation.slug,
								title: prescribingAndDispensingInformation.potName,
						  }
						: undefined,
					professionSpecificInformation
						? {
								id: professionSpecificInformation.slug,
								title: professionSpecificInformation.potName,
						  }
						: undefined,
					preparations.length > 0
						? { id: "medical-device-types", title: "Medical device types" }
						: undefined,
				]}
			/>
			{deviceDescription && <SimplePot {...deviceDescription} />}
			{patientAndCarerAdvice && <SimplePot {...patientAndCarerAdvice} />}
			{prescribingAndDispensingInformation && (
				<SimplePot {...prescribingAndDispensingInformation} />
			)}
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
		}
	}
`;

export default CMPIPage;
