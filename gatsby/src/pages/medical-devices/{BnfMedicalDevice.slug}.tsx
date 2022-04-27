import { graphql, Link } from "gatsby";
import React, { FC } from "react";
import striptags from "striptags";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { ColumnList } from "@nice-digital/nds-column-list";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { MedicalDevicesMenu } from "@/components/MedicalDevicesMenu/MedicalDevicesMenu";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

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
		<Layout>
			<SEO
				title={`${titleNoHtml} | Medical devices`}
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
				<Breadcrumb>{titleNoHtml}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={<span dangerouslySetInnerHTML={{ __html: title }} />}
			/>

			<Grid gutter="loose" data-testid="body">
				<GridItem cols={12} md={4} lg={3} className="hide-print">
					<MedicalDevicesMenu />
				</GridItem>
				<GridItem cols={12} md={9} lg={9}>
					<ColumnList>
						{medicalDeviceTypes
							.sort((a, b) => a.slug.localeCompare(b.slug))
							.map((medicalDeviceType) =>
								medicalDeviceType.hasPreps ? (
									<li>
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
				</GridItem>
			</Grid>
		</Layout>
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
