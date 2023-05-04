import { Link } from "gatsby";
import { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { ColumnList } from "@nice-digital/nds-column-list";
import { PageHeader } from "@nice-digital/nds-page-header";

import { NEWSEO } from "@/components/SEO/NEWSEO";
import { useMedicalDevicePages } from "@/hooks/useMedicalDevicePages";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export function Head(): JSX.Element {
	return (
		<NEWSEO
			title="Medical devices"
			description="Browse medical devices, by type."
		/>
	);
}

const MedicalDevicesIndexPage: FC = () => {
	const { siteTitleShort } = useSiteMetadata(),
		medicalDevicePages = useMedicalDevicePages();

	return (
		<>
			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb>Medical devices</Breadcrumb>
			</Breadcrumbs>

			<PageHeader id="content-start" heading="Medical devices" />

			<ColumnList
				aria-label="Pages in the medical devices section"
				data-tracking="medical-devices-pages-column-list"
			>
				{medicalDevicePages.map(({ href, title }) => (
					<li key={title}>
						<Link to={href} dangerouslySetInnerHTML={{ __html: title }} />
					</li>
				))}
			</ColumnList>
		</>
	);
};

export default MedicalDevicesIndexPage;
