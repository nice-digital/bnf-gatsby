import { render, screen } from "@testing-library/react";
import Cookies from "js-cookie";
import React from "react";

import {
	EULABanner,
	COOKIE_CONTROL_NAME,
	EULA_COOKIE_NAME,
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
		// Cookies.get = jest.fn().mockImplementation(() => undefined);
		Cookies.get = jest.fn().mockImplementation((name?: string) => {
			console.log({ name });
			if (name === COOKIE_CONTROL_NAME) {
				console.log("checking for cookie control");
				return undefined;
			}
			if (name === EULA_COOKIE_NAME) {
				console.log("checking for BNF-EULA");
				return undefined;
			}
			return undefined;
		});
		const { rerender } = render(<EULABanner />);

		jest.runOnlyPendingTimers();
		rerender(<EULABanner />);
		expect(document.body).toMatchSnapshot();
	});

	it("should match snapshot for COOKIE_CONTROL: true, BNF-EULA-ACCEPTED: undefined", () => {
		const { rerender } = render(<EULABanner />);
		Cookies.get = jest.fn().mockImplementation((name) => {
			if (name === COOKIE_CONTROL_NAME) return true;
			if (name === EULA_COOKIE_NAME) return undefined;
			return undefined;
		});
		jest.runOnlyPendingTimers();
		rerender(<EULABanner />);
		expect(document.body).toMatchSnapshot();
	});

	it("should match snapshot for COOKIE_CONTROL: true, BNF-EULA-ACCEPTED: true", () => {
		const { rerender } = render(<EULABanner />);
		Cookies.get = jest.fn().mockImplementation((name) => {
			if (name === COOKIE_CONTROL_NAME) return true;
			if (name === EULA_COOKIE_NAME) return true;
			return undefined;
		});
		jest.runOnlyPendingTimers();
		rerender(<EULABanner />);
		expect(document.body).toMatchSnapshot();
	});

	it("should match snapshot for COOKIE_CONTROL: undefined, BNF-EULA-ACCEPTED: true", () => {
		const { rerender } = render(<EULABanner />);
		Cookies.get = jest.fn().mockImplementation((name) => {
			if (name === COOKIE_CONTROL_NAME) return undefined;
			if (name === EULA_COOKIE_NAME) return true;
			return undefined;
		});
		jest.runOnlyPendingTimers();
		rerender(<EULABanner />);
		expect(document.body).toMatchSnapshot();
	});

	xit("should render the EULABanner content", () => {
		Cookies.get = jest.fn().mockImplementationOnce(() => undefined);
		render(<EULABanner />);
		expect(
			screen.getByText("NICE BNF End User Licence Agreement")
		).toBeInTheDocument();
	});

	xit("should show the EULABanner if there is no cookie present", () => {
		Cookies.get = jest.fn().mockImplementationOnce(() => undefined);
		render(<EULABanner />);
		const banner = screen.getByRole("dialog");
		expect(banner).toBeInTheDocument();
		expect(banner).toHaveAttribute("data-state", "open");
	});

	xit("should not show the EULABanner if there is a cookie present", () => {
		Cookies.get = jest.fn().mockImplementationOnce(() => "true");
		render(<EULABanner />);
		const banner = screen.queryByRole("dialog");
		expect(banner).not.toBeInTheDocument();
	});
});
