import { useLocation } from "@reach/router";
import { render, screen } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockQueryData } from "@/hooks/useMedicalDevicePages.test";

import { MedicalDevicesMenu } from "./MedicalDevicesMenu";

(useStaticQuery as jest.Mock).mockReturnValue(mockQueryData);

describe("MedicalDevicesMenu", () => {
	it("should render labelled navigation wrapper", () => {
		render(<MedicalDevicesMenu />);

		expect(
			screen.getByRole("navigation", { name: "Medical device pages" })
		).toBeInTheDocument();
	});

	it("should render anchor back to parent medical devices section", () => {
		render(<MedicalDevicesMenu />);

		expect(
			screen.getByRole("link", { name: "Medical devices" })
		).toHaveAttribute("href", "/medical-devices/");
	});

	it("should render anchor for each medical device from feed", () => {
		render(<MedicalDevicesMenu />);

		expect(
			screen.getByRole("link", { name: "Artificial saliva products" })
		).toHaveAttribute("href", "/medical-devices/artificial-saliva-products/");

		expect(screen.getAllByRole("link")).toHaveLength(3);
	});

	it("should highlight current page", () => {
		(useLocation as jest.Mock).mockImplementationOnce(
			() =>
				new URL(
					"https://bnf-gatsby-tests.nice.org.uk/medical-devices/artificial-saliva-products/"
				)
		);

		render(<MedicalDevicesMenu />);

		expect(
			screen.getByRole("link", { name: "Artificial saliva products" })
		).toHaveAttribute("aria-current", "true");
	});
});
