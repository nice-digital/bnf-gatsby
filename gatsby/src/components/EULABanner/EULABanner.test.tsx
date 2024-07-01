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
});
