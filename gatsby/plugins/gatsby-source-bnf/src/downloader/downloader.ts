import axios, { type AxiosResponseHeaders } from "axios";

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
		transformResponse: [
			(data: string) => {
				// TODO: Replace image paths
				return data;
			},
		].concat(axios.defaults.transformResponse || []),
	});

	return data;
};

/** Downloads the ZIP file of images from the feed as a buffer */
export const downloadImages = async ({
	site,
	feedURL,
	userKey,
}: PluginOptions): Promise<Buffer> => {
	const url = `${site}/images`;

	const { data } = await axios.get<Buffer>(url, {
		baseURL: feedURL,
		params: {
			user_key: userKey,
		},
		responseType: "arraybuffer",
	});

	return data;
};
