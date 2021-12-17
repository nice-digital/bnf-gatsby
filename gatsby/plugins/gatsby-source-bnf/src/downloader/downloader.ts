import axios from "axios";

import type { Feed } from "./types";

export const downloadFeed = async (feedURL: string): Promise<Feed> => {
	const response = await axios.get<Feed>(feedURL);

	return response.data;
};
