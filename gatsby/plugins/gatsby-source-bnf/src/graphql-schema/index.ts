import { aboutSectionSchema } from "./about-section";
import { cautionaryAndAdvisoryGuidanceSchema } from "./cautionary-advisory-guidance";
import { cautionaryAndAdvisoryLabelSchema } from "./cautionary-advisory-label";
import { dentalPractitionersFormularySchema } from "./dental-practitioners-formulary";
import { drugSchema } from "./drug";
import { guidanceSchema } from "./guidance";
import { indicationsAndDoseSchema } from "./indications-and-dose";
import { interactantSchema } from "./interactant";
import { medicalDeviceSchema } from "./medical-device";
import { nursePrescribersSchema } from "./nurse-prescribers-formulary";
import { prepSchema } from "./prep";
import { recordSectionSchema } from "./record-section";
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
	indicationsAndDoseSchema,
	interactantSchema,
	medicalDeviceSchema,
	nursePrescribersSchema,
	prepSchema,
	recordSectionSchema,
	simpleRecordSchema,
	treamentSummarySchema,
	woundManagementSchema,
].join("\n");
