import { type NodeInput } from "gatsby";

import {
	type PHPID,
	type SID,
	type FeedRecordSection,
} from "../../downloader/types";
import { type NodeModel } from "../../node-model";
import { BnfNode, type BnfNodeType } from "../../node-types";
import { slugify } from "../slug";

import { nodeTypePathMap } from "./node-type-paths";

type TitledNodeInput = { title: string } & NodeInput;

type SectionsNodeInput = TitledNodeInput & { sections: FeedRecordSection[] };

/**
 * Regular expression to target relative anchors to othe entities within the BNF.
 * That is, anchors with an href attribute in the form either:
 * - `/about/<PHPID>` e.g. `/about/PHP107734` is Nurse Prescribers' Advisory Group
 * - `/guidance/<PHPID>` e.g. `/guidance/PHP107736` is Guidance on intravenous infusions
 * - `/drug/<SID>` e.g. `/drug/_608199018` is Brolucizumab
 * - `/treatmentSummaries/<SID>` e.g. `/treatmentSummaries/_386275201` is Bacillus Calmette-Guérin vaccine
 * - `/treatmentSummaries/<SID>#<sectionId>` e.g. `/treatmentSummaries/_266958834#section_266958834-1` is Proprietary Infusion Fluids for Parenteral Feeding
 * - `/cautionaryAndAdvisoryLabels/<PHPID>` e.g. /cautionaryAndAdvisoryLabels/PHP194 for Guidance for cautionary and advisory labels
 * - `/dentalPractitionersFormulary/<SID>` e.g. `/dentalPractitionersFormulary/_258049705` is Dental Practitioners’ Formulary
 * - `/nursePrescribersFormulary/<SID>` e.g. `/nursePrescribersFormulary/_129024858` is Approved list for prescribing by Community Practitioner Nurse Prescribers (NPF)
 * - `/woundManagement/<SID>` e.g. `/woundManagement/_320704649` is Wound management products and elasticated garments
 * - `/woundManagement/taxonomy/<SID>` e.g. `/woundManagement/taxonomy/_873705277` for Alginate dressings
 */
const relativeAnchorRegex =
	/<a[^>]*?href="(\/([^/#"]*)(?:\/([^/#"]*))?\/([^/#"]*)(?:#([^"]*))?)".*?<\/a>/gm;

const entityTypes = [
	"about",
	"cautionaryAndAdvisoryLabels",
	"dentalPractitionersFormulary",
	"drug",
	"guidance",
	"medicalDevice",
	"nursePrescribersFormulary",
	"treatmentSummaries",
	"woundManagement",
] as const;

export type EntityType = typeof entityTypes[number];

const receivedPathToNode = new Map<EntityType, BnfNodeType>([
	["about", BnfNode.AboutSection],
	["cautionaryAndAdvisoryLabels", BnfNode.CautionaryAndAdvisoryGuidance],
	["dentalPractitionersFormulary", BnfNode.DentalPractitionersFormulary],
	["drug", BnfNode.Drug],
	["guidance", BnfNode.Guidance],
	["medicalDevice", BnfNode.MedicalDevice],
	["nursePrescribersFormulary", BnfNode.NursePrescribersFormularyIntroduction],
	["treatmentSummaries", BnfNode.TreatmentSummary],
	["woundManagement", BnfNode.WoundManagementTaxonomy], // TODO: How do we handle wound management taxonomy links?
]);

const anchorReplacer =
	(nodeModel: NodeModel) =>
	(
		anchorHTML: string,
		href: string,
		entityType: EntityType,
		taxonomy: "taxonomy" | null,
		id: SID | PHPID,
		sectionId: `section${SID}-${number}` | null
	): string => {
		// Check the first path of the URL path is a thing we know about.
		// If we don't then something's changed in the feed and we want to know about it
		if (!entityTypes.includes(entityType))
			throw Error(
				`Unknown type of '${entityType}' found in link ${anchorHTML}`
			);

		// It would be weird if the taxonomy part of the URL was present for anything but wound management
		if (taxonomy && entityType !== "woundManagement")
			throw Error(
				`Taxonomy found for type of '${entityType}' in link ${anchorHTML}. Only wound management links can have a taxonomy path.`
			);

		// We don't support a section id hash on every type of content
		if (
			sectionId &&
			entityType !== "dentalPractitionersFormulary" &&
			entityType !== "treatmentSummaries"
		)
			throw Error(
				`Section id of ${sectionId} found for type of '${entityType}' in link ${anchorHTML}. Only treatment summaries and dental practitioners can have a section id hash.`
			);

		if (entityType === "woundManagement") {
			// TODO Taxonomy page?
			return "";
		}

		// Look for the GraphQL node based on the SID/PHP ID in the parsed URL
		const nodeType = receivedPathToNode.get(entityType),
			node = nodeModel.getNodeById<TitledNodeInput>({
				id,
				type: nodeType,
			});
		if (!node) {
			throw Error(
				`Couldn't find ${nodeType} node with id ${id} in link ${anchorHTML}`
			);
		}

		// Look for the record section by ID from the parsed hash, if there is one, e.g. `section_266958834-1`
		let sectionSlug = "";
		if (sectionId) {
			const sections = (node as SectionsNodeInput).sections || [],
				sectionNode = sections.find(({ id }) => id === sectionId);

			if (!sectionNode)
				throw Error(
					`Couldn't find section with id ${sectionId} on node ${node.title} in link ${anchorHTML}`
				);

			sectionSlug = slugify(sectionNode.title);
		}

		// Turn the node into a URL path
		let newPath: string;
		if (entityType === "dentalPractitionersFormulary") {
			newPath = "/dental-practitioners-formulary/";
		} else if (entityType === "nursePrescribersFormulary") {
			newPath = "/nurse-prescribers-formulary/";
			// TODO: Handle links to NPF treatment summaries in the future?
		} else {
			const { title, internal } = node,
				basePath = nodeTypePathMap.get(internal.type);

			if (basePath === undefined)
				throw Error(
					`Node '${title}' has unsupported type '${internal.type}' for mapping to a path in link ${anchorHTML}`
				);

			newPath = `${basePath}/${slugify(title)}/`;
		}

		return anchorHTML.replace(
			href,
			newPath + (sectionSlug ? `#${sectionSlug}` : "")
		);
	};

export const replaceRelativeAnchors = (
	html: string,
	nodeModel: NodeModel
): string => html.replace(relativeAnchorRegex, anchorReplacer(nodeModel));
