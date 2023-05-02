import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { type Reporter } from "gatsby";

import type { Feed } from "./types";

const imageSrcRegex = /src=\\"([^\\"]*)\\"/gm;

export interface PluginOptions {
	/** The API base URL */
	feedURL: string;
	/** API key for authenticating against the feed endpoints */
	userKey: string;
	/** Which site we're currently building */
	site: "bnf" | "bnfc";
}

export const downloadFeed = async (
	{ site, feedURL, userKey }: PluginOptions,
	imagesBasePath: string,
	{ activityTimer }: Pick<Reporter, "activityTimer">
): Promise<Feed | null> => {
	const activity = activityTimer(`Download feed JSON`);
	activity.start();

	const url = `${site}/publication`,
		requestConfig: AxiosRequestConfig = {
			baseURL: feedURL,
			params: {
				format: "niceJson",
				user_key: userKey,
			},
			transformResponse: [
				(data: string) =>
					data.replace(imageSrcRegex, `src=\\"${imagesBasePath}$1\\"`),
			].concat(axios.defaults.transformResponse || []),
		};

	let axiosResponse: AxiosResponse<Feed>;
	try {
		activity.setStatus(`Downloading feed from ${url}`);
		axiosResponse = await axios.get<Feed>(url, requestConfig);
	} catch (e) {
		activity.panic("Error downloading feed JSON", e as Error);
		return null;
	}

	const sizeMB = Math.round(
		Number(axiosResponse.headers["content-length"]) / 1024 / 1024
	);

	activity.setStatus(`Downloaded ${sizeMB}MB feed data`);
	activity.end();
	return axiosResponse.data;
};

/** Downloads the ZIP file of images from the feed as a buffer */
export const downloadImageZIP = async (
	{ site, feedURL, userKey }: PluginOptions,
	{ activityTimer }: Pick<Reporter, "activityTimer">
): Promise<Buffer | null> => {
	const activity = activityTimer(`Download images ZIP`);
	activity.start();

	const url = `${site}/images`,
		requestConfig: AxiosRequestConfig = {
			baseURL: feedURL,
			params: {
				user_key: userKey,
			},
			responseType: "arraybuffer",
		};

	let axiosResponse: AxiosResponse<Buffer>;
	try {
		activity.setStatus(`Downloading images ZIP from ${url}`);
		axiosResponse = await axios.get<Buffer>(url, requestConfig);
	} catch (e) {
		activity.panic("Error downloading images ZIP", e as Error);
		return null;
	}

	const sizeMB = Math.round(
		Buffer.byteLength(axiosResponse.data) / 1024 / 1024
	);

	activity.setStatus(`Downloaded ${sizeMB}MB images ZIP`);
	activity.end();
	return axiosResponse.data;
};
