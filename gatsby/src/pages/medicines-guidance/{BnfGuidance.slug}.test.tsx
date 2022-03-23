import { useLocation } from "@reach/router";
import { render, screen, waitFor } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockQueryData } from "@/hooks/useMedicinesGuidancePages.test";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import MedicinesGuidancePage, {
	type MedicinesGuidancePageProps,
	query,
} from "./{BnfGuidance.slug}";

const pageProps: MedicinesGuidancePageProps = {
	data: {
		currentGuidancePage: {
			slug: "guidance-on-prescribing",
			title: "Guidance on prescribing",
			sections: [
				{
					order: 0,
					content:
						"<p>Medicines should be prescribed only when they are necessary</p>",
					slug: "general-guidance",
					title: "General guidance",
				},
				{
					order: 1,
					content:
						"<p><b>Biological medicines</b> are medicines that are made by or derived from a biological source</p>",
					slug: "biological-medicines",
					title: "Biological medicines",
				},
			],
		},
	},
	location: {
		pathname: "/about/changes/",
	},
};

describe("MedicinesGuidancePage", () => {
	beforeEach(() => {
		(useLocation as jest.Mock).mockImplementation(
			() =>
				new URL(
					"https://bnf-gatsby-tests.nice.org.uk" + pageProps.location.pathname
				)
		);

		(useStaticQuery as jest.Mock).mockReturnValue(mockQueryData);
	});

	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	it("should match snapshot for page contents", () => {
		render(<MedicinesGuidancePage {...pageProps} />);

		expect(screen.getByRole("main")).toMatchSnapshot();
	});

	it("should set page title", async () => {
		render(<MedicinesGuidancePage {...pageProps} />);

		await waitFor(() => {
			expect(document.title).toStartWith(
				"Guidance on prescribing | Medicines guidance | "
			);
		});
	});

	it("should set meta description for known path on BNF", async () => {
		render(<MedicinesGuidancePage {...pageProps} />);

		await waitFor(() => {
			expect(
				// eslint-disable-next-line testing-library/no-node-access
				document.querySelector(`meta[name="description"]`)
			).toHaveAttribute(
				"content",
				"Read general advice on prescribing, providing patient focused advice, including assessing risks versus benefits of potential prescribing decisions."
			);
		});
	});

	it("should set meta description for known path on BNFC", async () => {
		(useSiteMetadata as jest.Mock).mockImplementationOnce(() => ({
			siteTitleShort: "BNFC",
		}));

		render(<MedicinesGuidancePage {...pageProps} />);

		await waitFor(() => {
			expect(
				// eslint-disable-next-line testing-library/no-node-access
				document.querySelector(`meta[name="description"]`)
			).toHaveAttribute(
				"content",
				"Read general advice on prescribing, providing patient focused advice, including assessing risks versus benefits of potential prescribing decisions."
			);
		});
	});

	it("should throw error for unknown path", () => {
		expect(() => {
			render(
				<MedicinesGuidancePage
					data={{
						currentGuidancePage: {
							slug: "unknown",
							title: "Unknown",
							sections: [],
						},
					}}
					location={{ pathname: "/about/unknown" }}
				/>
			);
		}).toThrowError(
			"Couldn't find meta description for page 'Unknown' at path '/about/unknown'. Has the page been added or renamed?"
		);
	});
});
