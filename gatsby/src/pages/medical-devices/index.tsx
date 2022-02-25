import { graphql, Link } from "gatsby";
import { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { ColumnList } from "@nice-digital/nds-column-list";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export interface MedicalDevicesIndexPageProps {
	data: {
		allMedicalDevices: {
			nodes: {
				title: string;
				slug: string;
			}[];
		};
	};
}

const MedicalDevicesIndexPage: FC<MedicalDevicesIndexPageProps> = ({
	data: {
		allMedicalDevices: { nodes },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata();

	return (
		<Layout>
			<SEO title="Medical devices" />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb>Medical devices</Breadcrumb>
			</Breadcrumbs>

			<PageHeader id="content-start" heading="Medical devices" />

			<ColumnList aria-label="Pages in the medical devices section">
				{nodes.map(({ slug, title }) => (
					<li key={slug}>
						<Link
							to={`/medical-devices/${slug}/`}
							dangerouslySetInnerHTML={{ __html: title }}
						/>
					</li>
				))}
			</ColumnList>
		</Layout>
	);
};

export const query = graphql`
	{
		allMedicalDevices: allBnfMedicalDevice(
			sort: { fields: title, order: ASC }
		) {
			nodes {
				title
				slug
			}
		}
	}
`;

export default MedicalDevicesIndexPage;
