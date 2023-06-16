import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";

import { Accordion } from "../Accordion/Accordion";

import { AccordionGroup } from "./AccordionGroup";

describe("AccordionGroup", () => {
	const accordions = [
		<Accordion key="1" title="Accordion 1">
			Accordion 1 body
		</Accordion>,
		<Accordion key="2" title="Accordion 2">
			Accordion 2 body
			<Accordion key="2" title="Accordion 3 (nested)">
				Accordion 3 body
			</Accordion>
		</Accordion>,
	];

	it("should not render toggle button server side", () => {
		expect(
			renderToString(<AccordionGroup>{accordions}</AccordionGroup>)
		).not.toContain("<button");
	});

	it("should render toggle button client side", () => {
		render(<AccordionGroup>{accordions}</AccordionGroup>);

		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("should be collapsed by default", () => {
		render(<AccordionGroup>{accordions}</AccordionGroup>);
		const toggleButton = screen.getByRole("button");
		expect(toggleButton).toHaveAttribute("aria-expanded", "false");
		expect(toggleButton).toHaveTextContent("Show all sections");
	});

	it("should have default show text", () => {
		render(<AccordionGroup>{accordions}</AccordionGroup>);
		expect(screen.getByRole("button")).toHaveTextContent("Show all sections");
	});

	it("should have default hide text", async () => {
		render(<AccordionGroup>{accordions}</AccordionGroup>);
		const toggleButton = screen.getByRole("button");
		userEvent.click(toggleButton);
		await waitFor(() => {
			expect(toggleButton).toHaveTextContent("Hide all sections");
		});
	});

	it("should use toggle text function", async () => {
		render(
			<AccordionGroup
				toggleText={(isOpen) => (isOpen ? "Hide it!" : "Show it!")}
			>
				{accordions}
			</AccordionGroup>
		);
		const toggleButton = screen.getByRole("button");
		expect(toggleButton).toHaveTextContent("Show it!");
		userEvent.click(toggleButton);
		await waitFor(() => {
			expect(toggleButton).toHaveTextContent("Hide it!");
		});
	});

	it("should toggle aria expanded on toggle", async () => {
		render(<AccordionGroup>{accordions}</AccordionGroup>);
		const toggleButton = screen.getByRole("button");
		userEvent.click(toggleButton);
		await waitFor(() => {
			expect(toggleButton).toHaveAttribute("aria-expanded", "true");
		});
	});

	it("should toggle data tracking attrbiute on toggle", async () => {
		render(<AccordionGroup>{accordions}</AccordionGroup>);
		const toggleButton = screen.getByRole("button");
		expect(toggleButton).toHaveAttribute("data-tracking", "Show all sections");
		userEvent.click(toggleButton);
		await waitFor(() => {
			expect(toggleButton).toHaveAttribute(
				"data-tracking",
				"Hide all sections"
			);
		});
	});

	it("should call toggle function with correct isOpen boolean argument", async () => {
		const toggleFn = jest.fn();
		render(<AccordionGroup onToggle={toggleFn}>{accordions}</AccordionGroup>);
		userEvent.click(screen.getByRole("button"));

		await waitFor(() => {
			expect(toggleFn).toHaveBeenCalledWith(true);
		});
		userEvent.click(screen.getByRole("button"));

		await waitFor(() => {
			expect(toggleFn).toHaveBeenCalledWith(false);
		});
	});

	it("should show all child accordions on show button click", async () => {
		render(<AccordionGroup>{accordions}</AccordionGroup>);

		const accordionElements = screen
			.getAllByRole<HTMLDetailsElement>("group")
			.slice(0, 2);

		expect(accordionElements).toSatisfyAll((a: HTMLDetailsElement) => !a.open);

		userEvent.click(screen.getByRole("button"));

		await waitFor(() => {
			expect(accordionElements).toSatisfyAll((a: HTMLDetailsElement) => a.open);
		});
	});

	it("should not show descendent accordions on show button click", () => {
		render(<AccordionGroup>{accordions}</AccordionGroup>);

		const nestedAccordion = screen.getAllByRole<HTMLDetailsElement>("group")[2];

		expect(nestedAccordion).toHaveProperty("open", false);
		userEvent.click(screen.getByRole("button"));
		expect(nestedAccordion).toHaveProperty("open", false);
	});
});
