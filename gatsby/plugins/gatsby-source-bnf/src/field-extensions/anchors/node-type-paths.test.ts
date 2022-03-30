import { nodeTypePathMap } from "./node-type-paths";

describe("nodeTypePathMap", () => {
	it("should match snapshot for node type path mappings", () => {
		expect(nodeTypePathMap).toMatchInlineSnapshot(`
		Map {
		  "BnfAboutSection" => "/about",
		  "BnfCautionaryAndAdvisoryGuidance" => "/about",
		  "BnfDentalPractitionersFormulary" => "/dental-practitioners-formulary",
		  "BnfDrug" => "/drugs",
		  "BnfGuidance" => "/medicines-guidance",
		  "BnfMedicalDevice" => "/medical-devices",
		  "BnfNursePrescribersFormularyIntroduction" => "/nurse-prescribers-formulary",
		  "BnfTreatmentSummary" => "/treatment-summaries",
		  "BnfWoundManagementIntroduction" => "/wound-management",
		  "BnfWoundManagementTaxonomy" => "/wound-management",
		}
	`);
	});
});
