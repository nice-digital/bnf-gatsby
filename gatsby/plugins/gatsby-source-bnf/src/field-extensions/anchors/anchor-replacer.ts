import { type NodeInput } from "gatsby";
import { js2xml, xml2js } from "xml-js";

import { type NodeModel } from "../../node-model";
import { slugify } from "../slug";

import { nodeTypePathMap } from "./node-type-paths";

type TitledNodeInput = { title: string } & NodeInput;

/**
 * Regular expression to target internal anchors, that is, anchors with an href attribute in the form either:
 * - `/#/content/bnf/PHP107737` (PHPID e.g. for about sections)
 * - `/#/content/bnf/_945274338` (SID e.g. for drugs)
 * Notice the hashbang URL formats - these come from the MC BNF.
 */
const internalAnchorRegex =
	/<a[^>]*?href="(\/#\/content\/bnf\/([^"]*))".*?<\/a>/gm;

const anchorReplacer =
	(nodeModel: NodeModel) =>
	(anchorHTML: string, href: string, id: string): string => {
		const node = nodeModel.getNodeById<TitledNodeInput>({
			id,
		});

		if (!node) {
			throw Error(`Couldn't find node with id ${id} in anchor ${anchorHTML}`);
		}

		const { title, internal } = node,
			path = nodeTypePathMap.get(internal.type);

		if (path === undefined)
			throw Error(
				`Node '${title}' has unsupported type '${internal.type}' for mapping to a path`
			);

		return anchorHTML.replace(href, `${path}/${slugify(title)}/`);
	};

export const replaceInternalAnchors = (
	html: string,
	nodeModel: NodeModel
): string => html.replace(internalAnchorRegex, anchorReplacer(nodeModel));
