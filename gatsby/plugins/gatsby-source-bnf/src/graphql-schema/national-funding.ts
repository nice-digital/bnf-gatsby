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
	The relevant decisions from NICE, SMC and AWMSG as well as NHS restrictions.
	"""
	type ${BnfNode.NationalFundingPotContent} {
		"What the content is for (the name of a drug class, drug or preparation). May contain HTML mark-up"
		contentFor: String!

		"The initial paragraph of text at the start of the national funding pot. May contain HTML mark-up"
		initialText: String! @html

		"Title for the NICE funding decisions."
		niceDecisionsTitle: String @html

		"The NICE funding decisions."
		niceDecisions: [${BnfNode.NationalFundingDecision}!]!

		"Title for the SMC funding decisions."
		smcDecisionsTitle: String @html

		"The SMC funding decisions."
		smcDecisions: [${BnfNode.NationalFundingDecision}!]!

		"Title for the AWMSG funding decisions."
		awmsgDecisionsTitle: String @html

		"The AWMSG funding decisions."
		awmsgDecisions: [${BnfNode.NationalFundingDecision}!]!

		"Title for the non-NHS content."
		nonNhsTitle: String @html

		"Whether the drug can be accessed through the NHS, based on whether it is approved for national funding. May contain HTML mark-up."
		nonNhs: String @html
	}

	"""
	A specific funding decision.
	"""
	type ${BnfNode.NationalFundingDecision} {
		"The funding identifier (e.g. TA177)"
		fundingIdentifier: String! @html

		"The slugified and lowercased funding identifier, used as an ID/hash link"
		slug: String! @slug(field: "fundingIdentifier")

		"The title of the funding decision, usually including the date that the decision was published. May contain HTML mark-up"
		title: String @html

		"The URL to the relevant funding body's decision."
		url: String!

		"A summary of the decision."
		approvedForUse: String! @html
	}
`;
