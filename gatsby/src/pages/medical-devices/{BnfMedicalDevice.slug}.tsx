import { graphql, Link } from "gatsby";
import React, { FC } from "react";
import striptags from "striptags";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export interface MedicalDevicePageProps {
	data: {
		bnfMedicalDevice: {
			title: string;
		};
	};
}

const MedicalDevicePage: FC<MedicalDevicePageProps> = ({
	data: {
		bnfMedicalDevice: { title },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata(),
		titleNoHtml = striptags(title);

	return (
		<Layout>
			<SEO title={`${titleNoHtml} | Medical devices`} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb to="/medical-devices/" elementType={Link}>
					Medical devices
				</Breadcrumb>
				<Breadcrumb>{titleNoHtml}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={<span dangerouslySetInnerHTML={{ __html: title }} />}
			/>
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfMedicalDevice(id: { eq: $id }) {
			title
		}
	}
`;

export default MedicalDevicePage;
