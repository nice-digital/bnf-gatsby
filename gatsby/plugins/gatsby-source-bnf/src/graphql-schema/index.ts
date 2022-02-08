import { aboutSectionSchema } from "./about-section";
import { cautionaryAndAdvisoryGuidanceSchema } from "./cautionary-advisory-guidance";
import { cautionaryAndAdvisoryLabelSchema } from "./cautionary-advisory-label";
import { dentalPractitionersFormularySchema } from "./dental-practitioners-formulary";
import { drugSchema } from "./drug";
import { guidanceSchema } from "./guidance";
import { recordSectionSchema } from "./record-section";
import { simpleRecordSchema } from "./simple-record";
import { treamentSummarySchema } from "./treatment-summary";

/**
 * Custom schema for our BNF-specific nodes
 *
 * See https://www.gatsbyjs.org/docs/schema-customization/#creating-type-definitions
 * And https://graphql.org/learn/schema/#type-language
 */
export const schema = [
	drugSchema,
	simpleRecordSchema,
	recordSectionSchema,
	aboutSectionSchema,
	treamentSummarySchema,
	guidanceSchema,
	cautionaryAndAdvisoryGuidanceSchema,
	cautionaryAndAdvisoryLabelSchema,
	dentalPractitionersFormularySchema,
].join("\n");
