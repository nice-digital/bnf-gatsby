import { render, screen } from "@testing-library/react";

import { Announcer } from "./Announcer";

describe("Announcer", () => {
	it("should set announcement in text content on Gatsby announcer element", () => {
		const announcer = document.createElement("div");
		announcer.id = "gatsby-announcer";
		announcer.setAttribute("aria-live", "assertive");
		announcer.setAttribute("role", "alert");
		document.body.appendChild(announcer);

		render(<Announcer announcement="Test announcement" />);

		expect(screen.getByRole("alert")).toHaveTextContent("Test announcement");

		announcer.remove();
	});
});
