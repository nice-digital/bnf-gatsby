import { type NodeInput } from "gatsby";

import { PHPID, type SID } from "../../downloader/types";
import { type NodeModel } from "../../node-model";
import { BnfNode, type BnfNodeType } from "../../node-types";
import { slugify } from "../slug";

import { nodeTypePathMap } from "./node-type-paths";

type TitledNodeInput = { title: string } & NodeInput;

/**
 * Regular expression to target internal (hash) anchors, that is, anchors with an href attribute in the form either:
 * - `/#/content/bnf/PHP107737` (PHPID e.g. for about sections)
 * - `/{drug|woundManagement}/_395033263` (SID e.g. for drugs)
 * Notice the hashbang URL formats - these come from the MC BNF.
 */
const relativeAnchorRegex =
	/<a[^>]*?href="(\/([^/#"]*)(?:\/([^/#"]*))?\/([^/#"]*)(?:#([^"]*))?)".*?<\/a>/gm;

const entityTypes = [
	"drug",
	"about",
	"guidance",
	"treatmentSummaries",
	"woundManagement",
	"medicalDevice",
	"dentalPractitionersFormulary",
	"nursePrescribersFormulary",
] as const;

type EntityType = typeof entityTypes[number];

const pathMap = new Map<EntityType, BnfNodeType>([
	["treatmentSummaries", BnfNode.TreatmentSummary],
	["about", BnfNode.AboutSection],
	["guidance", BnfNode.Guidance],
	["treatmentSummaries", BnfNode.TreatmentSummary],
	["woundManagement", BnfNode.WoundManagementTaxonomy], // TODO: How do we handle wound management taxonomy links?
	["medicalDevice", BnfNode.WoundManagementTaxonomy],
	["dentalPractitionersFormulary", BnfNode.DentalPractitionersFormulary],
	//["nursePrescribersFormulary", BnfNode.], // TODO: NPF
]);

const anchorReplacer =
	(nodeModel: NodeModel) =>
	(
		anchorHTML: string,
		href: string,
		entityType: string,
		taxonomy: "taxonomy" | null,
		id: SID | PHPID,
		sectionId: `section${SID}-${number}` | null
	): string => {
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

export const replaceRelativeAnchors = (
	html: string,
	nodeModel: NodeModel
): string => html.replace(relativeAnchorRegex, anchorReplacer(nodeModel));
