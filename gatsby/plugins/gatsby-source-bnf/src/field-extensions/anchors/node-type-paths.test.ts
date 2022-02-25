import { nodeTypePathMap } from "./node-type-paths";

describe("nodeTypePathMap", () => {
	expect(nodeTypePathMap).toMatchInlineSnapshot(`
		Map {
		  "BnfDrug" => "drugs",
		  "BnfAboutSection" => "about",
		  "BnfCautionaryAndAdvisoryGuidance" => "about",
		  "BnfTreatmentSummary" => "treatment-summaries",
		  "BnfGuidance" => "medicines-guidance",
		}
	`);
});
