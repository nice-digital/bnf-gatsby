import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { navigate } from "gatsby";

import { TagList, Tag } from "./TagList";

describe("TagList", () => {
	it("should render ordered list element", () => {
		render(
			<TagList>
				<Tag href="/test/">Test</Tag>
			</TagList>
		);
		expect(screen.getByRole("list")).toHaveProperty("tagName", "OL");
	});

	it("should spread additional props on list", () => {
		render(
			<TagList data-test="true">
				<Tag href="/test/">Test</Tag>
			</TagList>
		);
		expect(screen.getByRole("list")).toHaveAttribute("data-test", "true");
	});

	it("should render list item per tag component", () => {
		render(
			<TagList data-test="true">
				<Tag href="/test/">Test</Tag>
				<Tag href="/test/">Test</Tag>
			</TagList>
		);
		expect(screen.getAllByRole("listitem")).toHaveLength(2);
	});

	it("should render anchor with given tag text", () => {
		render(
			<TagList data-test="true">
				<Tag href="/test/">Test</Tag>
			</TagList>
		);
		expect(screen.getByRole("link", { name: "Test" })).toHaveAttribute(
			"href",
			"/test/"
		);
	});

	it("should render anchor with given tag HTML", () => {
		render(
			<TagList data-test="true">
				<Tag href="/test/">{"Test <em>thing</em>"}</Tag>
			</TagList>
		);
		expect(screen.getByRole("link", { name: "Test thing" })).toHaveAttribute(
			"href",
			"/test/"
		);
	});

	it("should used gatsby Link for anchor", async () => {
		const user = userEvent.setup();
		render(
			<TagList data-test="true">
				<Tag href="/test/">Test</Tag>
			</TagList>
		);
		user.click(screen.getByRole("link"));

		await waitFor(() => expect(navigate).toHaveBeenCalledWith("/test/"));
	});
});
