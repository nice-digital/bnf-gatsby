import { graphql } from "gatsby";

export const FullPrep = graphql`
	fragment FullPrep on BnfPrep {
		order
		name
		manufacturer
		ampId
		blackTriangle
		controlledDrugSchedule
		sugarFree
		activeIngredients
		packs {
			order
			amppId
			size
			unit
			nhsIndicativePrice
			legalCategory
			hospitalOnly
			drugTariff
			drugTariffPrice
			colour
		}
	}
`;
