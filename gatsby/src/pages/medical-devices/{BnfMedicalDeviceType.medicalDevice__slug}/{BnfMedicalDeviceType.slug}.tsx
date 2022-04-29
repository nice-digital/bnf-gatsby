import { graphql, Link } from "gatsby";
import { FC } from "react";
import striptags from "striptags";

import { type FeedPrep } from "@nice-digital/gatsby-source-bnf";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { AccordionGroup } from "@/components/AccordionGroup/AccordionGroup";
import { Layout } from "@/components/Layout/Layout";
import { MedicalDevicePrepsSection } from "@/components/MedicalDevicePrepsSection/MedicalDevicePrepsSection";
import { Prep } from "@/components/Prep/Prep";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { QueryResult } from "@/utils";

import styles from "./{BnfMedicalDeviceType.slug}.module.scss";

interface MedicalDeviceTypePageProps {
	data: {
		bnfMedicalDeviceType: {
			slug: string;
			title: string;
			medicalDevice: {
				title: string;
				slug: string;
			};
			preparations: QueryResult<FeedPrep>[];
		};
	};
}

const MedicalDeviceTypePage: FC<MedicalDeviceTypePageProps> = ({
	data: {
		bnfMedicalDeviceType: { title, medicalDevice, preparations },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata(),
		titleNoHtml = striptags(title);

	if (preparations.length === 0) return null;

	return (
		<Layout>
			<SEO
				title={`${titleNoHtml} | ${medicalDevice.title} | Medical devices`}
				description={`This medical device type describes the options that are currently recommended for ${titleNoHtml}.`}
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
				heading={<span dangerouslySetInnerHTML={{ __html: title }} />}
			/>

			{preparations.length > 0 ? (
				<MedicalDevicePrepsSection preps={preparations} />
			) : null}
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfMedicalDeviceType(id: { eq: $id }) {
			slug
			title
			medicalDevice {
				title
				slug
			}
			preparations {
				...FullPrep
			}
		}
	}
`;

export default MedicalDeviceTypePage;
