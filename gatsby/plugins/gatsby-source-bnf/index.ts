/**
 * Exporting things here, in combination with a custom path alias (see tsconfig.json)
 * allowe use to do things like:
 * import { FeedPrep } from "@nice-digital/gatsby-source-bnf";
 * Inside components etc.
 *
 * This allows us to re-use the types from the feed and avoid duplicating type definitions.
 */

export { BnfNode, type BnfNodeType, type BnfNodeTypes } from "./src/node-types";

export * from "./src/downloader/types";
