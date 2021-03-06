import { render, waitFor, screen } from "@testing-library/react";
import striptags from "striptags";

import InteractionsIntroductionPage, {
	type InteractionsIntroductionPageProps,
} from "./appendix-1-interactions";

const props: InteractionsIntroductionPageProps = {
	data: {
		bnfInteractionsIntroduction: {
			title: "Test intro title",
			sections: [
				{
					id: "test-id",
					content: "<p>I am some content for the introductions page</p>",
					title: "Test section title",
				},
			],
		},
	},
};

describe("InteractionsIntroductionPage", () => {
	it("should set page title", async () => {
		render(<InteractionsIntroductionPage {...props} />);
		await waitFor(() => {
			expect(document.title).toStartWith("Appendix 1 Interactions");
		});
	});

	it("should set page meta description", async () => {
		render(<InteractionsIntroductionPage {...props} />);
		await waitFor(() => {
			expect(
				document
					// eslint-disable-next-line testing-library/no-node-access
					.querySelector("meta[name='description']")
					?.getAttribute("content")
			).toEqual(
				"Read about how pharmacodynamic and pharmacokinetic interactions can occur, potential effects of these interactions, and how their severity is graded in the BNF."
			);
		});
	});

	it("should render the supplied content in the page", () => {
		render(<InteractionsIntroductionPage {...props} />);
		expect(
			screen.getByText(
				striptags(props.data.bnfInteractionsIntroduction.sections[0].content)
			)
		).toBeInTheDocument();
	});

	it("should match snapshot for page body", () => {
		const { container } = render(<InteractionsIntroductionPage {...props} />);
		expect(container).toMatchSnapshot();
	});
});
