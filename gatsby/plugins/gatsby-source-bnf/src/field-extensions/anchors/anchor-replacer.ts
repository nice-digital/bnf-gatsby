import { type NodeInput } from "gatsby";

import {
	type PHPID,
	type SID,
	type SectionID,
	type FeedRecordSection,
} from "../../downloader/types";
import { slugify } from "../../node-creation/slugify";
import { type NodeModel } from "../../node-model";
import { BnfNode, type BnfNodeType } from "../../node-types";

import { nodeTypePathMap } from "./node-type-paths";

type CustomNodeInput = NodeInput & {
	title: string;
	slug: string;
	sections?: FeedRecordSection[];
	parentTaxonomy?: string;
};

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

const landingPageNodeTypes: BnfNodeType[] = [
	BnfNode.DentalPractitionersFormulary,
	BnfNode.NursePrescribersFormularyIntroduction,
	BnfNode.WoundManagementIntroduction,
];

const receivedPathToNode = new Map<string, BnfNodeType>([
	["about", BnfNode.AboutSection],
	["cautionaryAndAdvisoryLabels", BnfNode.CautionaryAndAdvisoryGuidance],
	["dentalPractitionersFormulary", BnfNode.DentalPractitionersFormulary],
	["drug", BnfNode.Drug],
	["guidance", BnfNode.Guidance],
	["medicalDevice", BnfNode.MedicalDevice],
	["nursePrescribersFormulary", BnfNode.NursePrescribersFormularyIntroduction],
	["treatmentSummaries", BnfNode.TreatmentSummary],
	["woundManagement", BnfNode.WoundManagementIntroduction],
]);

const anchorReplacer =
	(nodeModel: NodeModel) =>
	(
		anchorHTML: string,
		href: string,
		entityType: string,
		taxonomy: "taxonomy" | null,
		id: SID | PHPID,
		sectionId: SectionID | null
	): string => {
		// It would be weird if the taxonomy part of the URL was present for anything but wound management
		if (taxonomy && entityType !== "woundManagement")
			throw Error(
				`Taxonomy found for type of '${entityType}' in link ${anchorHTML}. Only wound management links can have a taxonomy path.`
			);

		const nodeType = taxonomy
			? BnfNode.WoundManagementTaxonomy
			: receivedPathToNode.get(entityType);

		// Check the first path of the URL path is a thing we know about.
		// If we don't then something's changed in the feed and we want to know about it
		if (!nodeType)
			throw Error(
				`Unknown type of '${entityType}' found in link ${anchorHTML}`
			);

		// Look for the GraphQL node based on the SID/PHP ID in the parsed URL
		const node = nodeModel.getNodeById<CustomNodeInput>({
			id,
			type: nodeType,
		});

		if (!node) {
			throw Error(
				`Couldn't find ${nodeType} node with id ${id} in link ${anchorHTML}`
			);
		}

		const { title, internal } = node,
			basePath = nodeTypePathMap.get(internal.type);

		if (basePath === undefined)
			throw Error(
				`Node '${title}' has unsupported type '${internal.type}' for mapping to a path in link ${anchorHTML}`
			);

		const slug = node.slug || slugify(node.title);

		// Turn the node into a URL path
		let newPath: string;
		if (nodeType === BnfNode.WoundManagementTaxonomy) {
			const parentNode = nodeModel.getNodeById<CustomNodeInput>({
				id: node.parentTaxonomy || "",
				type: nodeType,
			});
			const grandParentNode = nodeModel.getNodeById<CustomNodeInput>({
				id: parentNode?.parentTaxonomy || "",
				type: nodeType,
			});

			if (!parentNode && !grandParentNode) {
				throw new Error(`No valid parent nodes for ${slug}!`);
			}

			newPath = grandParentNode
				? `${basePath}/${
						grandParentNode.slug || slugify(grandParentNode.title)
				  }/${slug}/`
				: `${basePath}/${
						parentNode?.slug || slugify(parentNode?.title as string)
				  }/#${slug}`;
		} else if (nodeType === BnfNode.NursePrescribersFormularyIntroduction) {
			newPath = `${basePath}/approved-list-for-prescribing-by-community-practitioner-nurse-prescribers-npf/`;
		} else if (landingPageNodeTypes.includes(nodeType)) {
			newPath = `${basePath}/`;
		} else {
			newPath = `${basePath}/${slug}/`;
		}

		if (!sectionId) return anchorHTML.replace(href, newPath);

		// Look for the record section by ID from the parsed hash, if there is one, e.g. `section_266958834-1`
		const sectionNode = (node.sections || []).find(
			({ id }) => id === sectionId
		);

		if (!sectionNode)
			throw Error(
				`Couldn't find section with id ${sectionId} on node ${node.title} in link ${anchorHTML}`
			);

		const sectionSlug = slugify(sectionNode.title);

		return anchorHTML.replace(href, `${newPath}#${sectionSlug}`);
	};

export const replaceRelativeAnchors = (
	html: string,
	nodeModel: NodeModel
): string => html.replace(relativeAnchorRegex, anchorReplacer(nodeModel));
