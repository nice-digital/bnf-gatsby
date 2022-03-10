/* istanbul ignore file */
/**
 * Exporting things here, in combination with a custom path alias (see tsconfig.json)
 * allows us to do things like the following inside components and pages:
 *
 * import { FeedPrep } from "@nice-digital/gatsby-source-bnf";
 *
 * This allows us to re-use the types from the feed and avoid duplicating type definitions.
 */

export { BnfNode, type BnfNodeType, type BnfNodeTypes } from "./src/node-types";

export * from "./src/downloader/types";
