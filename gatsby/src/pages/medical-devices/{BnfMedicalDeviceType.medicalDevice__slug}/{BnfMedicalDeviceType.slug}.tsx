import { graphql } from "gatsby";
import { FC } from "react";

import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";

interface MedicalDeviceTypePageProps {
	data: {
		bnfMedicalDeviceType: {
			slug: string;
			title: string;
			medicalDevice: {
				title: string;
				slug: string;
			};
			preparations: { name: string }[];
		};
	};
}

const MedicalDeviceTypePage: FC<MedicalDeviceTypePageProps> = ({
	data: {
		bnfMedicalDeviceType: { title, medicalDevice, preparations },
	},
}) => {
	if (preparations.length === 0) return null;

	return (
		<DetailsPageLayout
			titleHtml={title}
			parentTitleParts={[medicalDevice.title, "Medical devices"]}
			parentBreadcrumbs={[
				{ href: "/medical-devices/", text: "Medical devices" },
				{
					href: `/medical-devices/${medicalDevice.slug}/`,
					text: medicalDevice.title,
				},
			]}
			sections={[]}
		>
			<ol>
				{preparations.map((prep) => (
					<li key={prep.name}>{prep.name}</li>
				))}
			</ol>
		</DetailsPageLayout>
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
				name
			}
		}
	}
`;

export default MedicalDeviceTypePage;
