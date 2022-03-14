import { aboutSectionSchema } from "./about-section";
import { cautionaryAndAdvisoryGuidanceSchema } from "./cautionary-advisory-guidance";
import { cautionaryAndAdvisoryLabelSchema } from "./cautionary-advisory-label";
import { dentalPractitionersFormularySchema } from "./dental-practitioners-formulary";
import { drugSchema } from "./drug";
import { guidanceSchema } from "./guidance";
import { interactantSchema } from "./interactant";
import { medicalDeviceSchema } from "./medical-device";
import { monitoringSchema } from "./monitoring";
import { nationalFundingSchema } from "./national-funding";
import { prepSchema } from "./prep";
import { recordSectionSchema } from "./record-section";
import { simplePotSchema } from "./simple-pot";
import { simpleRecordSchema } from "./simple-record";
import { treamentSummarySchema } from "./treatment-summary";
import { woundManagementSchema } from "./wound-management";

/**
 * Custom schema for our BNF-specific nodes
 *
 * See https://www.gatsbyjs.org/docs/schema-customization/#creating-type-definitions
 * And https://graphql.org/learn/schema/#type-language
 */
export const schema = [
	aboutSectionSchema,
	cautionaryAndAdvisoryGuidanceSchema,
	cautionaryAndAdvisoryLabelSchema,
	dentalPractitionersFormularySchema,
	drugSchema,
	guidanceSchema,
	interactantSchema,
	medicalDeviceSchema,
	monitoringSchema,
	nationalFundingSchema,
	prepSchema,
	simplePotSchema,
	recordSectionSchema,
	simpleRecordSchema,
	treamentSummarySchema,
	woundManagementSchema,
].join("\n");
