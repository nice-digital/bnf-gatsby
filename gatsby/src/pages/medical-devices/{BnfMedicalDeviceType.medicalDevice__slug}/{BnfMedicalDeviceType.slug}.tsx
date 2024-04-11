import { graphql, Link } from "gatsby";
import { type FC } from "react";
import striptags from "striptags";

import {
	type FeedIndicationsAndDosePotContent,
	type FeedPrep,
} from "@nice-digital/gatsby-source-bnf";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import {
	type BasePot,
	IndicationsAndDoseContent,
} from "@/components/DrugSections";
import { MedicalDevicePrepsSection } from "@/components/MedicalDevicePrepsSection/MedicalDevicePrepsSection";
import { Menu } from "@/components/Menu/Menu";
import { SectionNav } from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { decapitalize, type QueryResult, type WithSlug } from "@/utils";

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
			indicationsAndDose:
				| (BasePot & {
						content: QueryResult<WithSlug<FeedIndicationsAndDosePotContent>>;
				  })
				| null;
			preparations: QueryResult<FeedPrep>[];
		};
	};
}

const MedicalDeviceTypePage: FC<MedicalDeviceTypePageProps> = ({
	data: {
		bnfMedicalDeviceType: {
			title,
			medicalDevice,
			preparations,
			indicationsAndDose,
		},
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
				{indicationsAndDose && (
					<>
						<GridItem cols={12} md={8} lg={9} className={styles.sections}>
							<SectionNav
								sections={[
									indicationsAndDose
										? {
												id: indicationsAndDose.slug,
												title: indicationsAndDose.potName,
											}
										: undefined,
									preparations.length > 0
										? {
												id: "medical-device-types",
												title: "Medical device types",
											}
										: undefined,
								]}
							></SectionNav>
						</GridItem>

						<GridItem cols={12} md={8} lg={9} className={styles.sections}>
							{" "}
							<section aria-labelledby={indicationsAndDose.slug}>
								<h2
									id={indicationsAndDose.slug}
									dangerouslySetInnerHTML={{
										__html: indicationsAndDose.potName,
									}}
								/>
								<IndicationsAndDoseContent
									collapsible={false}
									content={indicationsAndDose.content}
								/>
							</section>
						</GridItem>
					</>
				)}
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
			indicationsAndDose {
				potName
				slug
				content {
					...IndicationsAndDoseContent
				}
			}
			preparations {
				...FullPrep
			}
		}
	}
`;

export default MedicalDeviceTypePage;
