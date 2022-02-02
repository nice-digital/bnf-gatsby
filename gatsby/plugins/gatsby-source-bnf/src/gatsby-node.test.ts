import {
	type CreateSchemaCustomizationArgs,
	type PluginOptionsSchemaArgs,
} from "gatsby";
import Joi from "joi";

import { htmlFieldExtension } from "./field-extensions/html";
import { slugFieldExtension } from "./field-extensions/slug";
import { createSchemaCustomization, pluginOptionsSchema } from "./gatsby-node";
import { schema } from "./graphql-schema";

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
			expect(createTypes).toHaveBeenCalledWith(schema);
		});

		it("should create custom field extensions", () => {
			const createTypes = jest.fn(),
				createFieldExtension = jest.fn();

			const args: unknown = {
				actions: { createTypes, createFieldExtension },
			};

			createSchemaCustomization(args as CreateSchemaCustomizationArgs);

			expect(createFieldExtension).toHaveBeenCalledTimes(2);
			expect(createFieldExtension).toHaveBeenNthCalledWith(
				1,
				slugFieldExtension
			);
			expect(createFieldExtension).toHaveBeenNthCalledWith(
				2,
				htmlFieldExtension
			);
		});
	});

	describe("pluginOptionsSchema", () => {
		const pluginSchema = pluginOptionsSchema({
			Joi,
		} as unknown as PluginOptionsSchemaArgs);

		it("should fail validation with missing feed URL argument", () => {
			const validationResult = pluginSchema.validate({
				test: true,
				userKey: "anything",
				site: "bnf",
			});

			expect(validationResult.error).toBeTruthy();
			expect(validationResult.error).toHaveProperty(
				"message",
				`"feedURL" is required`
			);
		});

		it("should fail validation with empty feed URL string", () => {
			const validationResult = pluginSchema.validate({
				feedURL: "",
				userKey: "anything",
			});

			expect(validationResult.error).toBeTruthy();
			expect(validationResult.error).toHaveProperty(
				"message",
				`"feedURL" is not allowed to be empty`
			);
		});

		it("should fail validation with missing user key argument", () => {
			const validationResult = pluginSchema.validate({
				feedURL: "anything",
				site: "bnf",
			});

			expect(validationResult.error).toBeTruthy();
			expect(validationResult.error).toHaveProperty(
				"message",
				`"userKey" is required`
			);
		});

		it("should fail validation with empty user key argument", () => {
			const validationResult = pluginSchema.validate({
				feedURL: "anything",
				userKey: "",
				site: "bnf",
			});

			expect(validationResult.error).toBeTruthy();
			expect(validationResult.error).toHaveProperty(
				"message",
				`"userKey" is not allowed to be empty`
			);
		});

		it("should fail validation with missing site argument", () => {
			const validationResult = pluginSchema.validate({
				feedURL: "anything",
				userKey: "anything",
			});

			expect(validationResult.error).toBeTruthy();
			expect(validationResult.error).toHaveProperty(
				"message",
				`"site" is required`
			);
		});

		it("should fail validation with invalid site argument", () => {
			const validationResult = pluginSchema.validate({
				feedURL: "anything",
				userKey: "anything",
				site: "invalid",
			});

			expect(validationResult.error).toBeTruthy();
			expect(validationResult.error).toHaveProperty(
				"message",
				`"site" must be one of [bnf, bnfc]`
			);
		});

		it("should pass validation with provided options", () => {
			const validationResult = pluginSchema.validate({
				feedURL: "Something",
				userKey: "anything",
				site: "bnf",
			});

			expect(validationResult.error).toBeFalsy();
		});
	});
});
