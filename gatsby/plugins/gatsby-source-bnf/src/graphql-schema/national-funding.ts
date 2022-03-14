import { BnfNode } from "../node-types";

export const nationalFundingSchema = `
	"""
	A single section of national funding content for a BNF drug or medical device. A monograph will include content from relevant drug classes (groups of drugs that share the same properties), the drug itself, and specific preparations where the properties differ from those of the generic drug. This record has these three parts of content in the drugClassContent, drugContent and prepContent fields respectively.
	"""
	type ${BnfNode.NationalFundingPot} {
		"The name/title of the pot."
		potName: String!

		"The slugified and lowercased pot name, used as an ID/hash link"
		slug: String! @slug(field: "potName")

		"The national funding pot content that relates to relevant drug classes for the drug. This field will contain more than one entry when the drug belongs to multiple drug classes with relevant content for the pot."
		drugClassContent: [${BnfNode.NationalFundingPotContent}!]!

		"The national funding pot content that relates to the drug."
		drugContent: ${BnfNode.NationalFundingPotContent}

		"Any national funding pot content that relates to specific preparations. This field will contain more than one entry when the drug has multiple preparations with specific relevant content for the pot."
		prepContent: [${BnfNode.NationalFundingPotContent}!]!
	}

	"""
	The relevant decisions from NICE, SMC and AWMSG.
	"""
	type ${BnfNode.NationalFundingPotContent} {
		"What the content is for (the name of a drug class, drug or preparation). May contain HTML mark-up"
		contentFor: String!

		"The initial paragraph of text at the start of the national funding pot. May contain HTML mark-up"
		initialText: String!

		"The NICE funding decisions."
		niceDecisions: [${BnfNode.FundingDecision}!]!

		"The SMC funding decisions."
		smcDecisions: [${BnfNode.FundingDecision}!]!

		"The AWMSG funding decisions."
		awmsgDecisions: [${BnfNode.FundingDecision}!]!
	}

	"""
	A specific funding decision.
	"""
	type ${BnfNode.FundingDecision} {
		"The funding identifier (e.g. TA177)"
		fundingIdentifier: String!

		"The slugified and lowercased funding identifier, used as an ID/hash link"
		slug: String! @slug(field: "fundingIdentifier")

		"The title of the funding decision, usually including the date that the decision was published. May contain HTML mark-up"
		title: String

		"The URL to the relevant funding body's decision."
		url: String!

		"A summary of the decision."
		approvedForUse: String!
	}
`;
