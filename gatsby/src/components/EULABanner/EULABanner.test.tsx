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

describe("EULABanner", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
		jest.clearAllMocks();
	});

	it("should match snapshot for COOKIE_CONTROL: undefined, BNF-EULA-ACCEPTED: undefined ", () => {
		Cookies.get = jest.fn().mockImplementation((name) => {
			if (name === COOKIE_CONTROL_NAME) return undefined;
			if (name === EULA_COOKIE_NAME) return undefined;
			return undefined;
		});
		const { rerender } = render(<EULABanner />);
		jest.runOnlyPendingTimers();
		rerender(<EULABanner />);
		expect(document.body).toMatchSnapshot();
	});

	it("should match snapshot for COOKIE_CONTROL: true, BNF-EULA-ACCEPTED: undefined", () => {
		Cookies.get = jest.fn().mockImplementation((name) => {
			if (name === COOKIE_CONTROL_NAME) return true;
			if (name === EULA_COOKIE_NAME) return undefined;
			return undefined;
		});
		const { rerender } = render(<EULABanner />);
		jest.runOnlyPendingTimers();
		rerender(<EULABanner />);
		expect(document.body).toMatchSnapshot();
	});

	it("should match snapshot for COOKIE_CONTROL: true, BNF-EULA-ACCEPTED: true", () => {
		Cookies.get = jest.fn().mockImplementation((name) => {
			if (name === COOKIE_CONTROL_NAME) return true;
			if (name === EULA_COOKIE_NAME) return true;
			return undefined;
		});
		const { rerender } = render(<EULABanner />);
		jest.runOnlyPendingTimers();
		rerender(<EULABanner />);
		expect(document.body).toMatchSnapshot();
	});

	it("should match snapshot for COOKIE_CONTROL: undefined, BNF-EULA-ACCEPTED: true", () => {
		Cookies.get = jest.fn().mockImplementation((name) => {
			if (name === COOKIE_CONTROL_NAME) return undefined;
			if (name === EULA_COOKIE_NAME) return true;
			return undefined;
		});
		const { rerender } = render(<EULABanner />);
		jest.runOnlyPendingTimers();
		rerender(<EULABanner />);
		expect(document.body).toMatchSnapshot();
	});

	it("should render the EULABanner content", () => {
		Cookies.get = jest.fn().mockImplementation((name) => {
			if (name === COOKIE_CONTROL_NAME) return true;
			if (name === EULA_COOKIE_NAME) return undefined;
			return undefined;
		});
		const { rerender } = render(<EULABanner />);
		jest.runOnlyPendingTimers();
		rerender(<EULABanner />);
		expect(
			screen.getByText("NICE BNF End User Licence Agreement")
		).toBeInTheDocument();
	});

	it("should show the EULABanner if there is no cookie present", () => {
		Cookies.get = jest.fn().mockImplementation((name) => {
			if (name === COOKIE_CONTROL_NAME) return true;
			if (name === EULA_COOKIE_NAME) return undefined;
			return undefined;
		});
		const { rerender } = render(<EULABanner />);
		jest.runOnlyPendingTimers();
		rerender(<EULABanner />);
		const banner = screen.getByRole("dialog");
		expect(banner).toBeInTheDocument();
		expect(banner).toHaveAttribute("data-state", "open");
	});

	it("should not show the EULABanner if there is a cookie present", () => {
		Cookies.get = jest.fn().mockImplementation((name) => {
			if (name === COOKIE_CONTROL_NAME) return true;
			if (name === EULA_COOKIE_NAME) return true;
			return undefined;
		});
		const { rerender } = render(<EULABanner />);
		jest.runOnlyPendingTimers();
		rerender(<EULABanner />);
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

		Cookies.get = jest.fn().mockImplementation((name) => {
			if (name === COOKIE_CONTROL_NAME) return true;
			if (name === EULA_COOKIE_NAME) return undefined;
			return undefined;
		});
		const { rerender } = render(<EULABanner />);

		jest.runOnlyPendingTimers();
		rerender(<EULABanner />);

		const banner = screen.queryByRole("dialog");
		expect(banner).not.toBeInTheDocument();

		// reset the document body then it doesn't affect other tests
		document.body.innerHTML = "";
	});

	it("should call set cookies on accept", async () => {
		const user = userEvent.setup();
		Cookies.get = jest.fn().mockImplementation((name) => {
			if (name === COOKIE_CONTROL_NAME) return true;
			if (name === EULA_COOKIE_NAME) return undefined;
			return undefined;
		});
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
