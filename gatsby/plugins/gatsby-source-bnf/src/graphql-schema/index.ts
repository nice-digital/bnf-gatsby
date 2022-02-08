import { aboutSectionSchema } from "./about-section";
import { cautionaryAndAdvisoryGuidanceSchema } from "./cautionary-advisory-guidance";
import { cautionaryAndAdvisoryLabelSchema } from "./cautionary-advisory-label";
import { drugSchema } from "./drug";
import { guidanceSchema } from "./guidance";
import { interactantSchema } from "./interactant";
import { recordSectionSchema } from "./record-section";
import { simpleRecordSchema } from "./simple-record";
import { treamentSummarySchema } from "./treatment-summary";

// Custom schema for our BNF-specific nodes
// See https://www.gatsbyjs.org/docs/schema-customization/#creating-type-definitions
// And https://graphql.org/learn/schema/#type-language
export const schema = [
	drugSchema,
	interactantSchema,
	simpleRecordSchema,
	recordSectionSchema,
	aboutSectionSchema,
	treamentSummarySchema,
	guidanceSchema,
	cautionaryAndAdvisoryGuidanceSchema,
	cautionaryAndAdvisoryLabelSchema,
].join("\n");
