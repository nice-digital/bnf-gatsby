import axios, {
	type AxiosRequestConfig,
	type AxiosResponseTransformer,
} from "axios";

import {
	downloadFeed,
	downloadImageZIP,
	type PluginOptions,
} from "./downloader";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("downloader", () => {
	const pluginOptions: PluginOptions = {
			feedURL: "https://someurl.com/v2/",
			site: "bnf",
			userKey: "abc123",
		},
		panic = jest.fn(),
		activityTimer = jest.fn().mockReturnValue({
			start: jest.fn(),
			end: jest.fn(),
			setStatus: jest.fn(),
			panic: panic,
		}),
		reporter = {
			activityTimer,
		};

	describe("downloadFeed", () => {
		it("should download JSON data from feed URL", async () => {
			const mockJsonResponseBody = {
				test: true,
			};

			mockedAxios.get.mockResolvedValueOnce({
				data: mockJsonResponseBody,
				headers: { "content-length": 4078960 },
			});

			const returnedData = await downloadFeed(
				pluginOptions,
				"/img/123/",
				reporter
			);

			expect(mockedAxios.get).toHaveBeenCalledWith("bnf/publication", {
				baseURL: "https://someurl.com/v2/",
				params: { format: "niceJson", user_key: "abc123" },
				transformResponse: expect.any(Array),
			});
			expect(returnedData).toBe(mockJsonResponseBody);
		});

		it("should prepend image base path to all src attributes via response transform", async () => {
			mockedAxios.get.mockResolvedValueOnce({
				headers: { "content-length": 9 },
			});

			await downloadFeed(pluginOptions, "/img/123/", reporter);

			const requestConfig = mockedAxios.get.mock
				.calls[0][1] as AxiosRequestConfig;

			const a = requestConfig.transformResponse as AxiosResponseTransformer[];

			expect(a[0](`src=\\"a.png\\"`)).toBe(`src=\\"/img/123/a.png\\"`);
		});

		it("should panic when feed request errors", async () => {
			const error = new Error("Mock error");
			mockedAxios.get.mockRejectedValueOnce(error);

			const data = await downloadFeed(pluginOptions, "/img/123/", reporter);

			expect(panic).toHaveBeenCalledWith("Error downloading feed JSON", error);
			expect(data).toBeNull();
		});
	});

	describe("downloadImageZIP", () => {
		it("should download JSON data from feed URL", async () => {
			const mockBufferResponse = Buffer.alloc(9999);

			mockedAxios.get.mockResolvedValueOnce({
				data: mockBufferResponse,
			});

			const returnedData = await downloadImageZIP(pluginOptions, reporter);

			expect(mockedAxios.get).toHaveBeenCalledWith("bnf/images", {
				baseURL: "https://someurl.com/v2/",
				params: { user_key: "abc123" },
				responseType: "arraybuffer",
			});

			expect(returnedData).toBe(mockBufferResponse);
		});

		it("should panic when feed request errors", async () => {
			const error = new Error("Mock error");
			mockedAxios.get.mockRejectedValueOnce(error);

			const buffer = await downloadImageZIP(pluginOptions, reporter);

			expect(panic).toHaveBeenCalledWith("Error downloading images ZIP", error);
			expect(buffer).toBeNull();
		});
	});
});
