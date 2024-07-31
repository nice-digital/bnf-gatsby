import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cookies from "js-cookie";
import React from "react";

import {
	EULABanner,
	COOKIE_CONTROL_NAME,
	EULA_COOKIE_NAME,
	COOKIE_EXPIRY,
} from "./EULABanner";

const mockCookiesGet = (
	cookieControl: boolean | undefined,
	eulaAccepted: boolean | undefined
) => {
	Cookies.get = jest.fn().mockImplementation((name) => {
		if (name === COOKIE_CONTROL_NAME) return cookieControl;
		if (name === EULA_COOKIE_NAME) return eulaAccepted;
		return undefined;
	});
};

describe("EULABanner", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should match snapshot for COOKIE_CONTROL: undefined, BNF-EULA-ACCEPTED: undefined", () => {
		mockCookiesGet(undefined, undefined);
		render(<EULABanner />);
		expect(document.body).toMatchSnapshot();
	});

	it("should match snapshot for COOKIE_CONTROL: true, BNF-EULA-ACCEPTED: undefined", () => {
		mockCookiesGet(true, undefined);
		render(<EULABanner />);
		expect(
			screen.getByText("NICE BNF End User Licence Agreement")
		).toBeInTheDocument();
		expect(document.body).toMatchSnapshot();
	});

	it("should match snapshot for COOKIE_CONTROL: true, BNF-EULA-ACCEPTED: true", () => {
		mockCookiesGet(true, true);
		render(<EULABanner />);
		const banner = screen.queryByRole("dialog");
		expect(banner).not.toBeInTheDocument();
		expect(document.body).toMatchSnapshot();
	});

	it("should match snapshot for COOKIE_CONTROL: undefined, BNF-EULA-ACCEPTED: true", () => {
		mockCookiesGet(undefined, true);
		render(<EULABanner />);
		expect(document.body).toMatchSnapshot();
	});

	xit("should render the EULABanner content", () => {
		mockCookiesGet(true, undefined);
		render(<EULABanner />);
		expect(
			screen.getByText("NICE BNF End User Licence Agreement")
		).toBeInTheDocument();
	});

	it("should show the EULABanner if there is no cookie present", () => {
		mockCookiesGet(true, undefined);
		render(<EULABanner />);
		const banner = screen.getByRole("dialog");
		expect(banner).toBeInTheDocument();
		expect(banner).toHaveAttribute("data-state", "open");
	});

	xit("should not show the EULABanner both cookies are present", () => {
		mockCookiesGet(true, true);
		render(<EULABanner />);
		const banner = screen.queryByRole("dialog");
		expect(banner).not.toBeInTheDocument();
	});

	it("should not show the EULABanner if the cookie control dialog is open", () => {
		const MockCookieBannerRegion = document.createElement("div");
		MockCookieBannerRegion.setAttribute("role", "region");

		const MockCookieBannerElement = document.createElement("div");
		MockCookieBannerElement.classList.add("ccc-module--slideout");

		MockCookieBannerRegion.appendChild(MockCookieBannerElement);
		document.body.appendChild(MockCookieBannerRegion);

		mockCookiesGet(true, undefined);
		render(<EULABanner />);

		const banner = screen.queryByRole("dialog");
		expect(banner).not.toBeInTheDocument();

		// reset the document body then it doesn't affect other tests
		document.body.innerHTML = "";
	});

	it("should call set cookies on accept", async () => {
		const user = userEvent.setup();
		mockCookiesGet(true, undefined);
		Cookies.set = jest.fn();
		render(<EULABanner />);
		user.click(screen.getByRole("button", { name: "I accept these terms" }));

		await waitFor(() => {
			expect(Cookies.set).toHaveBeenCalledWith(EULA_COOKIE_NAME, "true", {
				expires: COOKIE_EXPIRY,
			});
		});
	});
});
