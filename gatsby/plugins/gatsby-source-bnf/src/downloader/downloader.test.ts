import axios from "axios";

import { downloadFeed } from "./downloader";

jest.mock("axios");

describe("downloader", () => {
	it("should download JSON data from feed URL", async () => {
		const mockJsonResponseBody = {
			test: true,
		};

		(axios.get as jest.Mock).mockResolvedValueOnce({
			data: mockJsonResponseBody,
		});

		const returnedData = await downloadFeed("A URL");

		expect(axios.get).toHaveBeenCalledWith("A URL");
		expect(returnedData).toBe(mockJsonResponseBody);
	});
});
