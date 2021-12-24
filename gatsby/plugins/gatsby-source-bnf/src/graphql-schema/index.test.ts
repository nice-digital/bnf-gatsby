import { schema } from "./";

describe("schema", () => {
	it("should match snapshot", () => {
		expect(schema).toMatchSnapshot();
	});
});
