import { aboutSectionSchema } from "./about-section";
import { classificationSchema } from "./classification";
import { drugSchema } from "./drug";
import { recordSectionSchema } from "./record-section";
import { simpleRecordSchema } from "./simple-record";

// Custom schema for our BNF-specific nodes
// See https://www.gatsbyjs.org/docs/schema-customization/#creating-type-definitions
// And https://graphql.org/learn/schema/#type-language
export const schema = [
	drugSchema,
	classificationSchema,
	simpleRecordSchema,
	recordSectionSchema,
	aboutSectionSchema,
].join("\n");
