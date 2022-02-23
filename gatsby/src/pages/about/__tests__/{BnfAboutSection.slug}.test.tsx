import { useLocation } from "@reach/router";
import { render, screen, waitFor } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockAboutPagesQueryData } from "@/hooks/useAboutPages.test";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import AboutSectionPage, {
	type AboutSectionPageProps,
	query,
} from "../{BnfAboutSection.slug}";

const pageProps: AboutSectionPageProps = {
	data: {
		currentAboutPage: {
			title: "Changes",
			sections: [
				{
					order: 0,
					content:
						"<p>Monthly updates are provided online via Medicines Complete and the NHS Evidence portal. The changes listed below are cumulative (from one print edition to the next).</p>",
					slug: "introduction",
					title: "Introduction",
				},
				{
					order: 1,
					content:
						"<p>Significant changes made since the release of data for the print edition of BNF 82 (September 2021 — March 2022):</p>",
					slug: "significant-changes",
					title: "Significant changes",
				},
			],
		},
	},
	location: {
		pathname: "/about/changes/",
	},
};

describe("AboutSectionPage", () => {
	beforeEach(() => {
		(useLocation as jest.Mock).mockImplementation(
			() =>
				new URL(
					"https://bnf-gatsby-tests.nice.org.uk" + pageProps.location.pathname
				)
		);

		(useStaticQuery as jest.Mock).mockReturnValue(mockAboutPagesQueryData);
	});

	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	it("should match snapshot for page contents", () => {
		render(<AboutSectionPage {...pageProps} />);

		expect(screen.getByRole("main")).toMatchSnapshot();
	});

	it("should set page title", async () => {
		render(<AboutSectionPage {...pageProps} />);

		await waitFor(() => {
			expect(document.title).toStartWith("Changes | About | ");
		});
	});

	it("should set meta description for known path on BNF", async () => {
		render(<AboutSectionPage {...pageProps} />);

		await waitFor(() => {
			expect(
				// eslint-disable-next-line testing-library/no-node-access
				document.querySelector(`meta[name="description"]`)
			).toHaveAttribute(
				"content",
				"Keep up to date with the latest significant changes in the BNF that are relevant to your clinical practice. Updated monthly."
			);
		});
	});

	it("should set meta description for known path on BNFC", async () => {
		(useSiteMetadata as jest.Mock).mockImplementationOnce(() => ({
			siteTitleShort: "BNFC",
		}));

		render(<AboutSectionPage {...pageProps} />);

		await waitFor(() => {
			expect(
				// eslint-disable-next-line testing-library/no-node-access
				document.querySelector(`meta[name="description"]`)
			).toHaveAttribute(
				"content",
				"Keep up to date with the latest significant changes in the BNFC that are relevant to your clinical practice. Updated monthly."
			);
		});
	});

	it("should throw error for unknown path", () => {
		expect(() => {
			render(
				<AboutSectionPage
					{...pageProps}
					location={{ pathname: "/about/unknown" }}
				/>
			);
		}).toThrowError(
			"Couldn't find meta description for page with path /about/unknown"
		);
	});
});
