import { graphql } from "gatsby";

export const FullPrep = graphql`
	fragment FullPrep on BnfPrep {
		name
		manufacturer
		ampId
		blackTriangle
		controlledDrugSchedule
		sugarFree
		activeIngredients
		packs {
			amppId
			size
			unit
			nhsIndicativePrice
			legalCategory
			hospitalOnly
			drugTariff
			drugTariffPrice
			colour
			acbs
		}
	}
`;
