import { IndicationsAndDoseContent } from "./IndicationsAndDoseContent";

describe("IndicationsAndDoseContent", () => {
	describe("collapsible", () => {
		it("should wrap content in accordion", () => {});

		it("should render accordion as closed by default", () => {});

		it("should rendering heading 3 with content for and prefix as accordion title", () => {});
	});

	describe("not collapsible", () => {
		it.todo("should not render accordion");

		it.todo("should render visually hidden with content for and prefix");
	});

	describe("body", () => {
		describe("Indications section", () => {
			it.todo("should render section for each indication and dose group");

			it.todo("should label section with indications");

			it.todo("should render heading 4 with multiple indications");
			it.todo(
				"should render SNOMED CT codes as data attributes on indications"
			);
		});

		describe("Routes of administration", () => {
			it.todo("should render section for each route of administration");

			it.todo("should render heading 5 for each route of administration");
		});

		describe("Patient groups", () => {
			it.todo("should render description list for patient groups");
			it.todo("should render item for each patient group");
			it.todo("should render class name for patient group item");
			it.todo("should render patient group with HTML dose statement");
		});
	});
});
