/* eslint-disable testing-library/no-node-access */
import { render, waitFor } from "@testing-library/react";
import React from "react";

import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import { SEO } from "./SEO";

describe("SEO", () => {
	it("should set HTML language to UK English", async () => {
		render(<SEO title="Custom title" description="Custom description" />);
		await waitFor(() => {
			expect(document.querySelector("html")?.getAttribute("lang")).toEqual(
				"en-GB"
			);
		});
	});

	it("should add BNF specific CSS class to html root element", async () => {
		render(<SEO />);
		await waitFor(() => {
			expect(document.documentElement).toHaveClass("site-bnf");
		});
	});

	it("should add BNFC specific CSS class to html root element", async () => {
		(useSiteMetadata as jest.Mock).mockImplementationOnce(() => ({
			isBNF: false,
		}));
		render(<SEO />);
		await waitFor(() => {
			expect(document.documentElement).toHaveClass("site-bnfc");
		});
	});

	it("should set default title and description when none provided", async () => {
		render(<SEO />);

		await waitFor(() => {
			expect(
				document
					.querySelector("meta[property='og:title']")
					?.getAttribute("content")
			).not.toBeUndefined();
		});

		expect(document.querySelector("head")).toMatchSnapshot();
	});

	it("should render custom title and description in document head", async () => {
		render(<SEO title="Custom title" description="Custom description" />);
		await waitFor(() => {
			expect(
				document
					.querySelector("meta[property='og:title']")
					?.getAttribute("content")
			).toEqual("Custom title | BNF content published by NICE");
		});

		expect(document.title).toEqual(
			"Custom title | BNF content published by NICE"
		);

		expect(
			document
				.querySelector("meta[property='og:title']")
				?.getAttribute("content")
		).toEqual("Custom title | BNF content published by NICE");
		expect(
			document
				.querySelector("meta[name='description']")
				?.getAttribute("content")
		).toEqual("Custom description");
		expect(
			document
				.querySelector("meta[property='og:description']")
				?.getAttribute("content")
		).toEqual("Custom description");
	});

	it("should render robots when noIndex is set to true", async () => {
		render(<SEO noIndex={true} />);
		await waitFor(() => {
			expect(document.querySelector("meta[name='robots']")).toHaveAttribute(
				"content",
				"noindex"
			);
		});
	});

	it("should not render robots when noIndex is set to false", async () => {
		render(<SEO noIndex={false} />);
		await waitFor(() => {
			expect(document.querySelector("meta[name='robots']")).toBeNull();
		});
	});

	it("should not render robots when noIndex is not set", async () => {
		render(<SEO />);
		await waitFor(() => {
			expect(document.querySelector("meta[name='robots']")).toBeNull();
		});
	});
});
