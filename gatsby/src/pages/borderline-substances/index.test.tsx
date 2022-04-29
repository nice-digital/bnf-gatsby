import { render, screen, waitFor } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockBorderlineSubstancesPagesQueryData } from "@/hooks/useBorderlineSubstancesPages.test";

import BorderlineSubstanceIntroductionPage, {
	type BorderlineSubstanceIntroductionPageProps,
} from "./";

const props: BorderlineSubstanceIntroductionPageProps = {
	data: {
		bnfBorderlineSubstancesIntroduction: {
			title: "Borderline Substances",
			sections: [],
		},
	},
};

describe("BorderlineSubstanceIntroductionPage", () => {
	beforeEach(() => {
		(useStaticQuery as jest.Mock).mockReturnValue(
			mockBorderlineSubstancesPagesQueryData
		);
	});

	it("should match snapshot for page contents", () => {
		render(<BorderlineSubstanceIntroductionPage {...props} />);

		expect(screen.getByRole("main")).toMatchSnapshot();
	});

	it("should set page title", async () => {
		render(<BorderlineSubstanceIntroductionPage {...props} />);

		await waitFor(() => {
			expect(document.title).toStartWith("Borderline Substances | ");
		});
	});
});
