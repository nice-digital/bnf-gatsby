import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cookies from "js-cookie";
import React from "react";

import {
	EULABanner,
	COOKIE_CONTROL_NAME,
	EULA_COOKIE_NAME,
	COOKIE_EXPIRY,
} from "./EULABanner";

jest.mock("js-cookie");

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
	it("should match snapshot", () => {
		mockCookiesGet(true, undefined);
		render(<EULABanner />);
		expect(document.body).toMatchSnapshot();
	});

	it("should render the EULABanner if the CookieControl is set and no cookie banner displayed", () => {
		mockCookiesGet(true, undefined);
		render(<EULABanner />);
		expect(
			screen.getByText("NICE BNF End User Licence Agreement")
		).toBeInTheDocument();
	});

	it("should observe the cookie banner dismissal and show EULA banner", async () => {
		const MockCookieBannerRegion = document.createElement("div");
		MockCookieBannerRegion.setAttribute("role", "region");

		const MockCookieBannerElement = document.createElement("div");
		MockCookieBannerElement.classList.add("ccc-module--slideout");

		MockCookieBannerRegion.appendChild(MockCookieBannerElement);
		document.body.appendChild(MockCookieBannerRegion);

		mockCookiesGet(true, undefined);
		render(<EULABanner />);

		expect(
			screen.queryByText("NICE BNF End User Licence Agreement")
		).not.toBeInTheDocument();

		act(() => {
			MockCookieBannerElement.remove();
		});

		await waitFor(() => {
			expect(
				screen.getByText("NICE BNF End User Licence Agreement")
			).toBeInTheDocument();
		});
	});

	it("should set EULA cookie and closes EULA banner on accept", async () => {
		const user = userEvent.setup();
		mockCookiesGet(true, undefined);

		render(<EULABanner />);
		const acceptButton = screen.getByRole("button", {
			name: "I accept these terms",
		});

		act(() => {
			user.click(acceptButton);
		});

		await waitFor(() => {
			expect(Cookies.set).toHaveBeenCalledWith(EULA_COOKIE_NAME, "true", {
				expires: COOKIE_EXPIRY,
			});
			// eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
			expect(
				screen.queryByText("CKS End User Licence Agreement")
			).not.toBeInTheDocument();
		});
	});

	it("should not show the EULABanner if there is a EULA cookie present", () => {
		mockCookiesGet(true, true);
		render(<EULABanner />);
		const banner = screen.queryByRole("dialog");
		expect(banner).not.toBeInTheDocument();
	});
});
