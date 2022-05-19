import { graphql } from "gatsby";

export const FullPresentation = graphql`
	fragment FullPresentation on BnfBorderlineSubstancePresentation {
		acbs
		carbohydrateGrams
		carbohydrateConstituents
		energyKCal
		energyKj
		fatConstituents
		fatGrams
		fibreConstituents
		fibreGrams
		formulation
		presentationNote
		proteinConstituents
		proteinGrams
		specialCharacteristics
		borderlineSubstancePreps {
			...FullPrep
		}
	}
`;
