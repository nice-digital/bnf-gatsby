import { BnfNode } from "../node-types";

export const interactionSchema = `
	"""
	An interactant, which is a substance against which interaction messages are authored. Interactions are generally authored against moieties while some drug monographs are authored against salts (e.g. 'warfarin' and 'warfarin sodium').
	"""
	type ${BnfNode.Interactant} implements Node @dontInfer {
		"The SID for the Interactant e.g. _694410247 which may, or may not, match the sid of a drug"
		sid: String!

		"The drug that matches this interactant, that is, the drug with same id if it exists, otherwise null"
		drug: ${BnfNode.Drug} @link(by: "sid", from: "sid")

		"The title for the interactant. May include HTML markup. E.g. anti-D (Rh0) immunoglobulin has a subscript 0"
		title: String!

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"An array of interactions related to this particular interactant"
		interactions: [${BnfNode.Interaction}!]!
	}

	"""
	An interaction, which is a combination of two interactants and an array of interaction messages that give further
	details on this combination.
	"""
	type ${BnfNode.Interaction} @dontInfer {
		"The second interactant"
		interactant: ${BnfNode.Interactant}! @link(by: "sid")

		"The messages for this interaction"
		messages: [${BnfNode.InteractionMessage}!]!
	}

	"""
	An interaction message, which contains am HTML explanation of the nature of the interaction as well as details
	of its severity.
	"""
	type ${BnfNode.InteractionMessage} @dontInfer {
		"An HTML explanation of the nature of the interaction"
		message: String!

		"A grading of how severe this interaction might be, e.g. severe/moderate"
		severity: String!

		"An integer that corresponds to the level of severity, with higher numbers indicating greater severity. Useful for sorting. Severe = 4; Moderate = 3; Mild = 2; Normal = 1; Unknown = 0"
		severityOrder: Int!

		"The evidence for the interaction. This will only be present for messages that are not describing additive effects (i.e. 'additiveEffect' is false). Can only be 'Study', 'Anecdotal', or 'Theoretical'."
		evidence: String

		"Whether the interaction is an additive effect (true) or not (false)."
		additiveEffect: Boolean!
	}
`;
