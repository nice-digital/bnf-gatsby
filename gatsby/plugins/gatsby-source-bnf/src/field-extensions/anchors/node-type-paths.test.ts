import { nodeTypePathMap } from "./node-type-paths";

describe("nodeTypePathMap", () => {
	it("should match snapshot for node type path mappings", () => {
		expect(nodeTypePathMap).toMatchInlineSnapshot(`
		Map {
		  "BnfDrug" => "drugs",
		  "BnfAboutSection" => "about",
		  "BnfCautionaryAndAdvisoryGuidance" => "about",
		  "BnfTreatmentSummary" => "treatment-summaries",
		  "BnfGuidance" => "medicines-guidance",
		  "BnfMedicalDevice" => "medical-devices",
		}
	`);
	});
});
