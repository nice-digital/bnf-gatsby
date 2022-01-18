import mockSearchJsonResponse from "./search-response.json";

const searchClient = jest.requireActual("@nice-digital/search-client");

module.exports = {
	...searchClient,
	search: jest.fn().mockResolvedValue(mockSearchJsonResponse),
};
