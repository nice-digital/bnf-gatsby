import { render, waitFor, screen, within } from "@testing-library/react";

import MedicalDeviceTypePage, {
	MedicalDeviceTypePageProps,
} from "./{BnfMedicalDeviceType.slug}";

const props: MedicalDeviceTypePageProps = {
	data: {
		bnfMedicalDeviceType: {
			title: "Camouflages",
			slug: "camouflages",
			medicalDevice: {
				title: "Camouflages",
				slug: "camouflages",
			},
			preparations: [
				{
					name: "Covermark classic foundation",
					manufacturer: "Colour Not Specified",
					activeIngredients: [],
					ampId: "123",
					blackTriangle: false,
					controlledDrugSchedule: null,
					packs: [],
					sugarFree: false,
				},
			],
		},
	},
};

describe("MedicalDeviceTypePage", () => {
	describe("SEO", () => {
		it("should set page title from medical type title", async () => {
			render(<MedicalDeviceTypePage {...props} />);
			await waitFor(() => {
				expect(document.title).toStartWith(
					"Camouflages | Camouflages | Medical devices | "
				);
			});
		});
	});

	describe("Page header", () => {});

	describe("Breacrumbs", () => {});

	describe("Prep list", () => {});
});
