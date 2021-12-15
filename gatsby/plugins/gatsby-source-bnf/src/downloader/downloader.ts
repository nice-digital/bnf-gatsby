import { readFile } from "fs/promises";

import { Feed } from "./types";

export const downloadFeed = async (): Promise<Feed> => {
	const feedData = await readFile("path here", "utf-8");

	const feedJson = JSON.parse(feedData);

	return feedJson as Feed;
};
