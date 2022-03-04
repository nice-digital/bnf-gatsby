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

const xRefReplacer =
	(nodeModel: NodeModel) =>
	(xRefXMLStr: string): string => {
		const parsedXml = xml2js(xRefXMLStr, { elementNameFn: () => "a" }),
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
			throw Error(
				`Couldn't find node with id '${idref}' or sid '${sid}' in xref ${xRefXMLStr}`
			);
		}

		const { title, internal } = node,
			path = nodeTypePathMap.get(internal.type);

		if (path === undefined)
			throw Error(
				`Node '${title}' has unsupported type '${node.internal.type}' for mapping to a path`
			);

		attributes["href"] = `${path}/${slugify(node.title)}/`;

		return js2xml(parsedXml, {
			attributeNameFn: (attrName) =>
				// Map original xref attributes to data-* attributes for debugging links
				knownXrefAttributes.includes(attrName) ? `data-${attrName}` : attrName,
		});
	};

export const replaceXRefs = (html: string, nodeModel: NodeModel): string =>
	html.replace(xRefRegex, xRefReplacer(nodeModel));
