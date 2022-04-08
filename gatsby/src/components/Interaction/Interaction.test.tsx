import { render, screen, within } from "@testing-library/react";
import React from "react";

import { Interaction, type InteractionProps } from "./Interaction";

const props: InteractionProps = {
	interactant: {
		title: "Test title",
		drug: {
			slug: "test-title",
		},
	},
	messages: [
		{
			additiveEffect: false,
			evidence: "Test evidence",
			message: "Lorem ipsum dolor sit amet",
			severity: "Severe",
			severityOrder: 4,
		},
		{
			additiveEffect: true,
			evidence: "More test evidence",
			message:
				"<p>Fusce in justo tincidunt, blandit est at, feugiat tellus.</p>",
			severity: "Normal",
			severityOrder: 1,
		},
	],
};

describe("Interaction", () => {
	it("Should match the snapshot", () => {
		render(<Interaction {...props} />);
		expect(document.body).toMatchSnapshot();
	});

	it("Should render the interactant's title as an h3", () => {
		render(<Interaction {...props} />);
		const heading = screen.getByRole("heading", {
			name: props.interactant.title,
			level: 3,
		});
		expect(heading).toBeInTheDocument();
	});

	it("Should render a message for each entry in the messages array", () => {
		render(<Interaction {...props} />);
		const messageListItems = screen.getAllByRole("listitem");
		expect(messageListItems).toHaveLength(props.messages.length);
	});

	it("Should render an appropriate class and message when the interaction is severe", () => {
		render(<Interaction {...props} />);
		const severeListItem = screen.getAllByRole("listitem")[0];
		// eslint-disable-next-line testing-library/no-node-access
		expect(severeListItem.firstChild).toHaveClass("severeMessage");

		const severeParagraph = within(severeListItem).getByText("Severe");
		expect(severeParagraph).toBeInTheDocument;
	});
});
