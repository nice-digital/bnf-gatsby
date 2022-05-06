import { graphql, Link } from "gatsby";
import { FC } from "react";
import striptags from "striptags";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export interface CMPIPageProps {
	data: {
		bnfClinicalMedicalDeviceInformationGroup: {
			slug: string;
			title: string;
			medicalDeviceType: {
				medicalDevice: {
					title: string;
					slug: string;
				};
			};
			deviceDescription: {
				potName: string;
				slug: string;
				contentFor: string;
				content: string;
			};
		};
	};
}

const CMPIPage: FC<CMPIPageProps> = ({
	data: {
		bnfClinicalMedicalDeviceInformationGroup: {
			title,
			medicalDeviceType: { medicalDevice },
			deviceDescription,
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
			{deviceDescription && (
				<section>
					<h2
						id={deviceDescription.slug}
						dangerouslySetInnerHTML={{ __html: deviceDescription.potName }}
					/>
					<div
						dangerouslySetInnerHTML={{ __html: deviceDescription.content }}
					/>
				</section>
			)}
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfClinicalMedicalDeviceInformationGroup(id: { eq: $id }) {
			slug
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
				name
			}
			deviceDescription {
				potName
				slug
				contentFor
				content
			}
		}
	}
`;

export default CMPIPage;
