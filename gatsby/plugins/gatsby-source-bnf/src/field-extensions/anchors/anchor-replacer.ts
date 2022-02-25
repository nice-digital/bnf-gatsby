import { type NodeInput } from "gatsby";
import { js2xml, xml2js } from "xml-js";

import { type NodeModel } from "../../node-model";
import { slugify } from "../slug";

import { nodeTypePathMap } from "./node-type-paths";

type TitledNodeInput = { title: string } & NodeInput;

const hrefRegex = /\/#\/content\/bnf\/(.*)/;

/**
 * Regular expression to target internal anchors, that is, anchors with an href attribute in the form either:
 * - `/#/content/bnf/PHP107737` (PHPID e.g. for about sections)
 * - `/#/content/bnf/_945274338` (SID e.g. for drugs)
 * Notice the hashbang URL formats - these come from the MC BNF.
 */
export const internalAnchorRegex = /<a.*?href="\/#.*?<\/a>/gm;

export const anchorReplacer =
	(nodeModel: NodeModel) =>
	(anchorElementXML: string): string => {
		const parsedXml = xml2js(anchorElementXML),
			attributes = parsedXml.elements[0].attributes as Record<string, string>,
			{ href } = attributes,
			hrefMatch = href.match(hrefRegex);

		if (!hrefMatch)
			throw Error(
				`Internal anchor ref was not on the format /#/content/bnf/<ID>`
			);

		const id = hrefMatch[1];

		const node = nodeModel.getNodeById<TitledNodeInput>({
			id,
		});

		if (!node) {
			// TODO: This should error, but it's a warning instead until we have final content in the feed with the correct links
			console.warn(
				`Couldn't find node with id ${id} in anchor ${anchorElementXML}`
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

		return js2xml(parsedXml);
	};
