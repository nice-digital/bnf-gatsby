import { decapitalize } from ".";

describe("utils", () => {
	describe("decapitalize", () => {
		it("should return empty string as-is", () => {
			expect(decapitalize("")).toBe("");
		});

		it("should decapitalize first letter of single word", () => {
			expect(decapitalize("Tablet")).toBe("tablet");
		});

		it("should decapitalize first letter of multiple words", () => {
			expect(decapitalize("Modified-release capsule")).toBe(
				"modified-release capsule"
			);
		});

		it("should decapitalize multiple comma separated words", () => {
			expect(decapitalize("Measles, mumps and rubella vaccine, live")).toBe(
				"measles, mumps and rubella vaccine, live"
			);
		});

		it("should decapitalize word with hyphen", () => {
			expect(decapitalize("Co-codamol")).toBe("co-codamol");
		});

		it("should decapitalize accented capital", () => {
			expect(decapitalize("Étest")).toBe("étest");
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

		it("should not decapitalize St John's wort", () => {
			expect(decapitalize("St John's wort")).toBe("St John's wort");
		});

		it("should not decapitalize string containing registered symbol", () => {
			expect(decapitalize("MucoClear® 3%")).toBe("MucoClear® 3%");
		});

		it("should not decapitalize single word containing capitals", () => {
			expect(decapitalize("OptiChamber")).toBe("OptiChamber");
		});

		it("should not decapitalize 2 words all starting with capitals", () => {
			expect(decapitalize("Fresubin Original")).toBe("Fresubin Original");
		});

		it("should not decapitalize multiple words when some start with capitals", () => {
			expect(decapitalize("Measles, Mumps and Rubella vaccine")).toBe(
				"Measles, Mumps and Rubella vaccine"
			);
			expect(decapitalize("Sterile Dressing Pack with Non-Woven Pads")).toBe(
				"Sterile Dressing Pack with Non-Woven Pads"
			);
		});
	});
});
