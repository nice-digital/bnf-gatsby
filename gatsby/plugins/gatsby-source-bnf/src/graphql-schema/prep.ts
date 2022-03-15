import { BnfNode } from "../node-types";

export const prepSchema = `
	"""
	The properties for a preparation. Context is provided by this object being given in the 'preps' field of MedicinalForm, or on a Medical Device.
	"""
	type ${BnfNode.Prep} @dontInfer {
		"The name of the preparation, for example, 'Anadin Paracetamol 500mg tablets'."
		name: String!

		"The manufacturer/supplier of the preparation, for example, 'GlaxoSmithKline Consumer Healthcare UK Ltd'."
		manufacturer: String!

		"The dm+d AMP ID for this preparation. This value is a SNOMED CT identifier, which should be represented as a 64-bit integer, but it is represented as a String in this JSON to avoid any potential problems of 32-bit integer overflows."
		ampId: ID!

		"A flag to indicate whether (true) or not (false) this preparation is subject to additional monitoring as required by the European Medicines Agency (EMA). If this flag is true, then an inverted black triangle symbol should be shown (Unicode character U+25BC: ▼)."
		blackTriangle: Boolean!

		"The controlled drug category for the preparation. If this value is not given then the preparation has no controlled drug status."
		controlledDrugSchedule: String

		"A marker to indicate whether the preparation is sugar-free or not. This field will not be populated for borderline substance and wound management preparations."
		sugarFree: Boolean

		"A list of the active ingredients for the preparation."
		activeIngredients: [String!]

		"A list of the packs for the preparation. For a borderline substance preparation, the packs are sorted by the 'size' field of the pack as a double-precision floating point number, in ascending order."
		packs: [${BnfNode.Pack}!]!
	}

	"""
	The properties for a specific pack of a preparation.
	"""
	type ${BnfNode.Pack} @dontInfer {
		"The dm+d AMPP ID for this pack, if available. This value is a SNOMED CT identifier, which should be represented as a 64-bit integer, but it is represented as a String in this JSON to avoid any potential problems of 32-bit integer overflows."
		amppId: ID

		"The quantity/size of the pack. The units for this quantity are given in the 'units' field. Will always be present except for wound management preparations."
		size: String

		"The units of the quantity/size in the 'size' field. Will always be present except for wound management preparations."
		unit: String

		"The NHS indicative price, if available, for example, £377.00 or £225,513.09. For wound management preparations, this field may contain the drug tariff price if no NHS indicative price exists."
		nhsIndicativePrice: String

		"The legal category, if available. Will not be present for +wound management preparations. Can only be 'POM', 'P', 'GSL', or 'Not Applicable'."
		legalCategory: String

		"A flag to indicate whether (true) or not (false) this pack is only available through hospital ordering. Will not be present for wound management preparations."
		hospitalOnly: Boolean

		"The drug tariff payment category, if available, for example, 'Part VIIIA Category A'."
		drugTariff: String

		"The drug tariff price, if available, for example, '£2.94' or '£2,181.53'. For wound management preparations, the drug tariff price may appear in the 'nhsIndicativePrice' field in the case where there is no NHS indicative price available."
		drugTariffPrice: String

		"The colour of the preparation, if available. This will only ever be present for wound management preparations."
		colour: String
	}
`;
