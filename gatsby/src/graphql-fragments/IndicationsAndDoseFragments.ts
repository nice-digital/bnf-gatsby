import { graphql } from "gatsby";

export const IndicationsAndDoseFragments = graphql`
	fragment IndicationsAndDoseContent on BnfIndicationsAndDoseContent {
		doseAdjustments
		extremesOfBodyWeight
		doseEquivalence
		potency
		pharmacokinetics
		indicationAndDoseGroups {
			order
			routesAndPatientGroups {
				order
				routeOfAdministration
				patientGroups {
					order
					patientGroup
					detailedPatientGroup
					doseStatement
				}
			}
			therapeuticIndications {
				order
				indication
				sctIndication
				sctTherapeuticIntent
			}
		}
	}
`;
