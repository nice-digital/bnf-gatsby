import { useLocation } from "@reach/router";
import { graphql, Link } from "gatsby";
import { FC } from "react";
import striptags from "striptags";

import { type FeedPrep } from "@nice-digital/gatsby-source-bnf";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { MedicalDevicePrepsSection } from "@/components/MedicalDevicePrepsSection/MedicalDevicePrepsSection";
import { Menu } from "@/components/Menu/Menu";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { decapitalize, QueryResult } from "@/utils";

import styles from "./{BnfMedicalDeviceType.slug}.module.scss";

export interface MedicalDeviceTypePageProps {
	data: {
		bnfMedicalDeviceType: {
			slug: string;
			title: string;
			medicalDevice: {
				title: string;
				slug: string;
				medicalDeviceTypes: {
					title: string;
					slug: string;
				}[];
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
		titleNoHtml = striptags(title),
		hasStackedNav = medicalDevice.medicalDeviceTypes.length > 1,
		medicalDeviceTitleNoHtml = striptags(medicalDevice.title);

	if (preparations.length === 0) return null;

	return (
		<>
			<SEO
				title={`${titleNoHtml} | ${medicalDevice.title} | Medical devices`}
				description={`This medical device type describes the options that are currently recommended for ${decapitalize(
					titleNoHtml
				)}.`}
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

			<Grid gutter="loose">
				{hasStackedNav ? (
					<GridItem cols={12} md={4} lg={3}>
						<Menu
							aria-label={medicalDeviceTitleNoHtml}
							label={medicalDeviceTitleNoHtml}
							link={{
								destination: `/medical-devices/${medicalDevice.slug}/`,
								elementType: Link,
							}}
							pages={medicalDevice.medicalDeviceTypes
								.sort((a, b) => a.slug.localeCompare(b.slug))
								.map((deviceType) => ({
									title: deviceType.title,
									href: `/medical-devices/${medicalDevice.slug}/${deviceType.slug}/`,
								}))}
						></Menu>
					</GridItem>
				) : null}
				<GridItem
					cols={12}
					md={hasStackedNav ? 8 : 12}
					lg={hasStackedNav ? 9 : 12}
					className={styles.sections}
				>
					{preparations.length > 0 ? (
						<MedicalDevicePrepsSection preps={preparations} />
					) : null}
				</GridItem>
			</Grid>
		</>
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
				medicalDeviceTypes {
					title
					slug
				}
			}
			preparations {
				...FullPrep
			}
		}
	}
`;

export default MedicalDeviceTypePage;
