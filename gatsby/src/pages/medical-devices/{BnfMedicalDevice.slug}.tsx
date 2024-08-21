import { graphql, Link } from "gatsby";
import React, { FC } from "react";
import striptags from "striptags";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { ColumnList } from "@nice-digital/nds-column-list";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { MedicalDevicesMenu } from "@/components/MedicalDevicesMenu/MedicalDevicesMenu";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { decapitalize } from "@/utils";

import styles from "./{BnfMedicalDevice.slug}.module.scss";

export interface MedicalDevicePageProps {
	data: {
		bnfMedicalDevice: {
			title: string;
			slug: string;
			medicalDeviceTypes: {
				title: string;
				slug: string;
				hasPreps: boolean;
				clinicalMedicalDeviceInformationGroups: {
					title: string;
					slug: string;
				}[];
			}[];
		};
	};
}

const MedicalDevicePage: FC<MedicalDevicePageProps> = ({
	data: {
		bnfMedicalDevice: { title, slug, medicalDeviceTypes },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata(),
		titleNoHtml = striptags(title);

	return (
		<>
			<SEO
				title={`${titleNoHtml} | Medical devices`}
				description={`This medical devices topic describes the options that are currently recommended for ${decapitalize(
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
				<Breadcrumb>{titleNoHtml}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={<span dangerouslySetInnerHTML={{ __html: title }} />}
				data-testid="page-header"
			/>

			<Grid gutter="loose" data-testid="body">
				<GridItem cols={12} md={4} lg={3} className="hide-print">
					<MedicalDevicesMenu />
				</GridItem>
				<GridItem cols={12} md={8} lg={9} className={styles.body}>
					{medicalDeviceTypes.every(
						(medicalDeviceType) => !medicalDeviceType.hasPreps
					) ? (
						medicalDeviceTypes
							.sort((a, b) => a.slug.localeCompare(b.slug))
							.map((medicalDeviceType) => (
								<section
									key={medicalDeviceType.title}
									aria-labelledby={medicalDeviceType.slug}
								>
									<h2
										id={medicalDeviceType.slug}
										dangerouslySetInnerHTML={{
											__html: medicalDeviceType.title,
										}}
									/>
									<ColumnList
										aria-label={`Products within ${medicalDeviceType.title}`}
										data-tracking="medical-device-column-list"
									>
										{medicalDeviceType.clinicalMedicalDeviceInformationGroups
											.sort((a, b) => a.slug.localeCompare(b.slug))
											.map((cmpi) => (
												<li key={cmpi.title}>
													<Link
														to={`/medical-devices/${slug}/${cmpi.slug}/`}
														dangerouslySetInnerHTML={{
															__html: cmpi.title,
														}}
													/>
												</li>
											))}
									</ColumnList>
								</section>
							))
					) : (
						<ColumnList
							aria-label={`Medical device types for ${titleNoHtml}`}
							data-tracking="medical-device-column-list"
						>
							{medicalDeviceTypes
								.sort((a, b) => a.slug.localeCompare(b.slug))
								.map((medicalDeviceType) =>
									medicalDeviceType.hasPreps ? (
										<li key={medicalDeviceType.title}>
											<Link
												to={`/medical-devices/${slug}/${medicalDeviceType.slug}/`}
												dangerouslySetInnerHTML={{
													__html: medicalDeviceType.title,
												}}
											/>
										</li>
									) : (
										<>
											{medicalDeviceType.clinicalMedicalDeviceInformationGroups
												.sort((a, b) => a.slug.localeCompare(b.slug))
												.map((cmpi) => (
													<li key={cmpi.title}>
														<Link
															to={`/medical-devices/${slug}/${cmpi.slug}/`}
															dangerouslySetInnerHTML={{
																__html: cmpi.title,
															}}
														/>
													</li>
												))}
										</>
									)
								)}
						</ColumnList>
					)}
				</GridItem>
			</Grid>
		</>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfMedicalDevice(id: { eq: $id }) {
			title
			slug
			medicalDeviceTypes {
				title
				slug
				hasPreps
				clinicalMedicalDeviceInformationGroups {
					title
					slug
				}
			}
		}
	}
`;

export default MedicalDevicePage;
