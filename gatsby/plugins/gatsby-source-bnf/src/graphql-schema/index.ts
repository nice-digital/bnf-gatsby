import { aboutSectionSchema } from "./about-section";
import { borderlineSubstancesSchema } from "./borderline-substances";
import { cautionaryAndAdvisoryGuidanceSchema } from "./cautionary-advisory-guidance";
import { cautionaryAndAdvisoryLabelSchema } from "./cautionary-advisory-label";
import { classificationSchema } from "./classifications";
import { dentalPractitionersFormularySchema } from "./dental-practitioners-formulary";
import { drugSchema } from "./drug";
import { guidanceSchema } from "./guidance";
import { indicationsAndDoseSchema } from "./indications-and-dose";
import { interactionSchema } from "./interaction";
import { medicalDeviceSchema } from "./medical-device";
import { monitoringSchema } from "./monitoring";
import { nationalFundingSchema } from "./national-funding";
import { nursePrescribersSchema } from "./nurse-prescribers-formulary";
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
	borderlineSubstancesSchema,
	cautionaryAndAdvisoryGuidanceSchema,
	cautionaryAndAdvisoryLabelSchema,
	classificationSchema,
	dentalPractitionersFormularySchema,
	drugSchema,
	guidanceSchema,
	indicationsAndDoseSchema,
	interactionSchema,
	medicalDeviceSchema,
	monitoringSchema,
	nationalFundingSchema,
	nursePrescribersSchema,
	prepSchema,
	simplePotSchema,
	recordSectionSchema,
	simpleRecordSchema,
	treamentSummarySchema,
	woundManagementSchema,
].join("\n");
