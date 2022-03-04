import { BnfNode } from "../node-types";

export const medicalDeviceSchema = `
	"""
	All the properties for a single medical device monograph.
	"""
	type ${BnfNode.MedicalDevice} implements Node @dontInfer {
		"The PHP ID for the medical device."
		phpid: ID!

		"The SID for the medical device."
		sid: ID!

		"The title for the medical device. May include HTML mark-up."
		title: String!

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")
	}
`;
