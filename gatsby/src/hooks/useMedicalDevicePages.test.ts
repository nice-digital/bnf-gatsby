import { useStaticQuery } from "gatsby";

import {
	useMedicalDevicePages,
	type MedicalDevicesQueryResult,
} from "./useMedicalDevicePages";

export const mockQueryData: MedicalDevicesQueryResult = {
	allBnfMedicalDevice: {
		pages: [
			{
				slug: "artificial-saliva-products",
				title: "Artificial saliva products",
			},
			{
				slug: "blood-glucose-testing-strips",
				title: "Blood glucose testing strips",
			},
		],
	},
};

(useStaticQuery as jest.Mock).mockReturnValue(mockQueryData);

describe("useMedicalDevicePages", () => {
	const medicalDevicePages = useMedicalDevicePages();

	it("should return correct number of links", () => {
		expect(medicalDevicePages).toHaveLength(2);
	});

	it("should prefix slugs with medical devices section path", () => {
		expect(medicalDevicePages[0]).toHaveProperty(
			"href",
			"/medical-devices/artificial-saliva-products/"
		);
	});

	it("should return correct titles and paths", () => {
		expect(medicalDevicePages).toStrictEqual([
			{
				href: "/medical-devices/artificial-saliva-products/",
				title: "Artificial saliva products",
			},
			{
				href: "/medical-devices/blood-glucose-testing-strips/",
				title: "Blood glucose testing strips",
			},
		]);
	});
});
