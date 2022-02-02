import axios from "axios";

import { downloadFeed, PluginOptions } from "./downloader";

jest.mock("axios");

describe("downloader", () => {
	const pluginOptions: PluginOptions = {
		feedURL: "https://someurl.com/v2/",
		site: "bnf",
		userKey: "abc123",
	};

	it("should download JSON data from feed URL", async () => {
		const mockJsonResponseBody = {
			test: true,
		};

		(axios.get as jest.Mock).mockResolvedValueOnce({
			data: mockJsonResponseBody,
		});

		const returnedData = await downloadFeed(pluginOptions);

		expect(axios.get).toHaveBeenCalledWith("bnf/publication", {
			baseURL: "https://someurl.com/v2/",
			params: { format: "niceJson", user_key: "abc123" },
		});
		expect(returnedData).toBe(mockJsonResponseBody);
	});
});
