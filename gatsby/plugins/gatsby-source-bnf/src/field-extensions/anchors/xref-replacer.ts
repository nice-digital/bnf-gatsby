import { type NodeInput } from "gatsby";
import { js2xml, xml2js } from "xml-js";

import { type NodeModel } from "../../node-model";
import { slugify } from "../slug";

import { nodeTypePathMap } from "./node-type-paths";

type TitledNodeInput = { title: string } & NodeInput;

/** Known/expected values for the type attribute on xref nodes */
const knownXrefTypes = ["drug", "bookmark"];

const knownXrefAttributes = ["type", "sid", "idref"];

/**
 * Regular expression to target `xref` element within an HTML string.
 * We can do this via a regex because HTML from the feed is always strict, valid XML.
 */
export const xRefRegex = /<xref[^>]*>.*?<\/xref>/gm;

export const xRefReplacer =
	(nodeModel: NodeModel) =>
	(xRefElementXML: string): string => {
		const parsedXml = xml2js(xRefElementXML, { elementNameFn: () => "a" }),
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
				`Couldn't find node with id ${idref} or sid ${sid} in xref ${xRefElementXML}`
			);

			attributes["href"] = `#`;
			attributes["style"] = `text-decoration: underline wavy from-font red;`;
		} else {
			const path = nodeTypePathMap.get(node.internal.type);

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
