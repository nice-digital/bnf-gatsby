import { type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import {
	type PHPID,
	type SID,
	type FeedDrug,
	type FeedIndicationsAndDosePotContent,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode, type OrderedDeep } from "./utils";

export type DrugNodeInput = Except<
	FeedDrug,
	| "id"
	| "primaryClassification"
	| "secondaryClassifications"
	| "constituentDrugs"
	| "indicationsAndDose"
> & {
	id: SID;
	phpid: PHPID;
	constituentDrugs?: {
		message: string;
		constituents: string[];
	};
	indicationsAndDose?: OrderedDeep<FeedDrug["indicationsAndDose"]>;
};

export const createDrugNodes = (
	drugs: FeedDrug[],
	sourceNodesArgs: SourceNodesArgs
): void => {
	drugs.forEach(
		({ constituentDrugs, id, sid, indicationsAndDose, ...drug }) => {
			const nodeContent: DrugNodeInput = {
				...drug,
				id: sid,
				sid,
				phpid: id,
				constituentDrugs: constituentDrugs && {
					message: constituentDrugs.message,
					constituents: constituentDrugs.constituents.map((d) => d.sid),
				},
				indicationsAndDose: indicationsAndDose && {
					potName: indicationsAndDose.potName,
					drugClassContent:
						indicationsAndDose.drugClassContent?.map(
							(drugClassContent, order) => ({
								...addIndicationsAndDoseOrder(drugClassContent),
								order,
							})
						) || [],
					drugContent:
						indicationsAndDose.drugContent &&
						addIndicationsAndDoseOrder(indicationsAndDose.drugContent),
					prepContent:
						indicationsAndDose.prepContent?.map((d, order) => ({
							...addIndicationsAndDoseOrder(d),
							order,
						})) || [],
				},
			};

			createBnfNode(nodeContent, BnfNode.Drug, sourceNodesArgs);
		}
	);
};

/**
 * Recursively add an order property onto each object within an array for the indications and dose content.
 * This enables use to keep the order as the feed.
 */
const addIndicationsAndDoseOrder = ({
	indicationAndDoseGroups,
	...properties
}: FeedIndicationsAndDosePotContent): OrderedDeep<FeedIndicationsAndDosePotContent> => ({
	...properties,
	indicationAndDoseGroups: indicationAndDoseGroups?.map(
		({ therapeuticIndications, routesAndPatientGroups }, order) => ({
			therapeuticIndications: therapeuticIndications.map((t, order) => ({
				...t,
				order,
			})),
			routesAndPatientGroups:
				routesAndPatientGroups?.map(
					({ routeOfAdministration, patientGroups }, order) => ({
						routeOfAdministration,
						patientGroups: patientGroups.map((group, order) => ({
							...group,
							order,
						})),
						order,
					})
				) || [],
			order,
		})
	),
});
