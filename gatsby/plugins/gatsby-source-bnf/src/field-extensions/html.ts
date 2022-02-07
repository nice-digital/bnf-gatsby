import { type NodeInput } from "gatsby";
import { js2xml, xml2js, type Element, type Attributes } from "xml-js";

import { type FieldResolveContext, type NodeModel } from "../node-model";
import { BnfNode } from "../node-types";

import { slugify } from "./slug";

const nodeTypePathMap: Record<string, string> = {
	[BnfNode.Drug]: "drugs",
	[BnfNode.AboutSection]: "about",
	[BnfNode.CautionaryAndAdvisoryGuidance]: "about",
	[BnfNode.TreatmentSummary]: "treatment-summaries",
	[BnfNode.Guidance]: "medicines-guidance",
};

type TitledNodeInput = { title: string } & NodeInput;

/**
 * Regular expression to target `xref` element within an HTML string.
 * We can do this via a regex because HTML from the feed is always strict, valid XML.
 */
const xRefRegex = /<xref[^>]*>.*?<\/xref>/gm;

/** Known/expected values for the type attribute on xref nodes */
const knownXrefTypes = ["drug", "bookmark"];

const knownXrefAttributes = ["type", "sid", "idref"];

const getHtmlReplaceFunc = (nodeModel: NodeModel) => (xrefXML: string) => {
	const parsedXml = xml2js(xrefXML, { elementNameFn: () => "a" }),
		attributes = parsedXml.elements[0].attributes as Record<string, string>,
		{ type, sid, idref } = attributes;

	if (!knownXrefTypes.includes(type))
		throw Error(
			`Unexpected xref type of ${type} found. Expected one of ${knownXrefTypes}.`
		);

	let node = nodeModel.getNodeById<TitledNodeInput>({
		id: idref,
	});

	// Some nodes e.g. treatment summaries seem to use the sid instead of PHP id so do a fallback query
	if (!node && sid)
		node = nodeModel.getNodeById<TitledNodeInput>({
			id: sid,
		});

	if (!node) {
		// TODO: This should error, but it's a warning instead until we have final content in the feed with the correct links
		console.warn(
			`Couldn't find node with id ${idref} or sid ${sid} in xref ${xrefXML}`
		);

		attributes["href"] = `#`;
		attributes["style"] = `text-decoration: underline wavy from-font red;`;
	} else {
		const path = nodeTypePathMap[node.internal.type];

		if (!path)
			throw Error(
				`Unsupported node type ${node.internal.type} for mapping to a path`
			);

		attributes["href"] = `/${path}/${slugify(node.title)}/`;
	}

	return js2xml(parsedXml, {
		attributeNameFn: (attrName) =>
			// Map original xref attributes to data-* attributes for debugging links
			knownXrefAttributes.includes(attrName) ? `data-${attrName}` : attrName,
	});
};

/**
 * Custom Gatsby field extension to process HTML string fields.
 * It replaces xrefs with anchor tags, resolving the xref ids into URL paths to the relevant page.
 *
 * @example Use within a GraphQL schema like:
 * 	content: String! @html
 *
 * See https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#creating-custom-extensions
 */
export const htmlFieldExtension = {
	name: "html",
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	extend(_options: unknown, _prevFieldConfig: unknown) {
		return {
			resolve(
				source: unknown,
				args: unknown,
				context: FieldResolveContext,
				info: unknown
			) {
				const fieldValue = context.defaultFieldResolver(
					source,
					args,
					context,
					info
				);

				if (!fieldValue || typeof fieldValue !== "string")
					throw Error(`Expected HTML content field value to be a string`);

				return fieldValue.replace(
					xRefRegex,
					getHtmlReplaceFunc(context.nodeModel)
				);
			},
		};
	},
};
