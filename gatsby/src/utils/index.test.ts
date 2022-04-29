import { decapitalize } from ".";

describe("utils", () => {
	describe("decapitalize", () => {
		it("should return empty string as-is", () => {
			expect(decapitalize("")).toBe("");
		});

		it("should decapitalize first letter of single word", () => {
			expect(decapitalize("Tablet")).toBe("tablet");
		});

		it("should decapitalize first letter of single word and ingore other capitals", () => {
			expect(decapitalize("Tablet ABC")).toBe("tablet ABC");
		});

		it("should decapitalize word with hyphen", () => {
			expect(decapitalize("Co-codamol")).toBe("co-codamol");
		});

		it("should not decapitalize single letter acronym", () => {
			expect(decapitalize("A")).toBe("A");
		});

		it("should not decapitalize multi letter acronym", () => {
			expect(decapitalize("ABC")).toBe("ABC");
		});

		it("should not decapitalize acronym", () => {
			expect(decapitalize("HIV infection")).toBe("HIV infection");
		});

		it("should not decapitalize acronym containg number", () => {
			expect(decapitalize("C1-esterase inhibitor")).toBe(
				"C1-esterase inhibitor"
			);
		});

		it("should not decapitalize accented capital", () => {
			expect(decapitalize("Étest")).toBe("Étest");
		});
	});
});
