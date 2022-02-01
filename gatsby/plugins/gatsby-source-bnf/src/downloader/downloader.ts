import axios from "axios";

import type { Feed } from "./types";

export interface PluginOptions {
	/** The API base URL */
	feedURL: string;
	/** API key for authenticating against the feed endpoints */
	userKey: string;
	/** Which site we're currently building */
	site: "bnf" | "bnfc";
}

export const downloadFeed = async ({
	site,
	feedURL,
	userKey,
}: PluginOptions): Promise<Feed> => {
	const url = `${site}/publication`;

	const { data } = await axios.get<Feed>(url, {
		baseURL: feedURL,
		params: {
			format: "niceJson",
			user_key: userKey,
		},
	});

	return data;
};
