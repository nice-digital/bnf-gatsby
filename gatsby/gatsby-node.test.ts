import { type CreateSchemaCustomizationArgs } from "gatsby";

import { initialFieldExtension } from "@/field-extensions/initial";

import { createSchemaCustomization } from "./gatsby-node";

describe("gatsby-node", () => {
	describe("createSchemaCustomization", () => {
		it("should call createTypes with custom schema", () => {
			const createTypes = jest.fn(),
				createFieldExtension = jest.fn();

			const args: unknown = {
				actions: { createTypes, createFieldExtension },
			};

			createSchemaCustomization(args as CreateSchemaCustomizationArgs);

			expect(createTypes).toHaveBeenCalledTimes(1);
			expect(createTypes.mock.calls[0][0]).toMatchInlineSnapshot(`
			"
				  type BnfDrug implements Node {
					\\"The lowercase first letter of the title, used for grouping\\"
					initial: String! @initial(field: \\"title\\")
				  }
				  type BnfTreatmentSummary implements Node {
					\\"The lowercase first letter of the title, used for grouping\\"
					initial: String! @initial(field: \\"title\\")
				  }
				"
		`);
		});

		it("should create custom field extensions", () => {
			const createTypes = jest.fn(),
				createFieldExtension = jest.fn();

			const args: unknown = {
				actions: { createTypes, createFieldExtension },
			};

			createSchemaCustomization(args as CreateSchemaCustomizationArgs);

			expect(createFieldExtension).toHaveBeenCalledTimes(1);
			expect(createFieldExtension).toHaveBeenNthCalledWith(
				1,
				initialFieldExtension
			);
		});
	});
});
