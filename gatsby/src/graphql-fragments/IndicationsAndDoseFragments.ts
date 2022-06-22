import { graphql } from "gatsby";

export const IndicationsAndDoseFragments = graphql`
	fragment IndicationsAndDoseContent on BnfIndicationsAndDoseContent {
		contentFor
		slug
		doseAdjustments
		extremesOfBodyWeight
		doseEquivalence
		potency
		pharmacokinetics
		indicationAndDoseGroups {
			routesAndPatientGroups {
				routeOfAdministration
				patientGroups {
					patientGroup
					detailedPatientGroup
					doseStatement
				}
			}
			therapeuticIndications {
				indication
				sctIndication
				sctTherapeuticIntent
			}
		}
	}
`;
