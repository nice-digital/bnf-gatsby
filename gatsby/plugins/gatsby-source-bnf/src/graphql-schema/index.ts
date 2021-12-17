import { classificationSchema } from "./classification";
import { drugSchema } from "./drug";

// Custom schema for our BNF-specific nodes
// See https://www.gatsbyjs.org/docs/schema-customization/#creating-type-definitions
// And https://graphql.org/learn/schema/#type-language
export const schema = [drugSchema, classificationSchema].join("\n");
