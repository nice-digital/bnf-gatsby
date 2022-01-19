import mockSearchJsonResponse from "@/mockdata/search-response.json";

const searchClient = jest.requireActual("@nice-digital/search-client");

module.exports = {
	...searchClient,
	search: jest.fn().mockResolvedValue(mockSearchJsonResponse),
};
