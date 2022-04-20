import * as fsPromises from "fs/promises";
import path from "path";

import {
	type SourceNodesArgs,
	type CreateSchemaCustomizationArgs,
	type PluginOptionsSchemaArgs,
} from "gatsby";
import Joi from "joi";

import { downloadFeed, type PluginOptions } from "./downloader/downloader";
import { htmlFieldExtension } from "./field-extensions/html";
import { slugFieldExtension } from "./field-extensions/slug";
import {
	createSchemaCustomization,
	sourceNodes,
	pluginOptionsSchema,
} from "./gatsby-node";
import { schema } from "./graphql-schema";
import mockFeed from "./mock-feed.json";
import { BnfNode } from "./node-types";

jest.mock("fs/promises");

jest.mock("./downloader/downloader", () => ({
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	downloadFeed: jest.fn().mockResolvedValue(require("./mock-feed.json")),
	downloadImageZIP: jest
		.fn()
		.mockResolvedValue(
			(jest.requireActual("fs/promises") as typeof fsPromises).readFile(
				path.join(__dirname, "mock-images.zip")
			)
		),
}));

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

	describe("sourceNodes", () => {
		const sourceNodesArgs: SourceNodesArgs = {
			reporter: {
				activityTimer: (): unknown => ({
					start: (): void => void 0,
					end: (): void => void 0,
					setStatus: (): void => void 0,
				}),
				info: (): void => void 0,
			},
			createContentDigest: jest.fn(),
			createNodeId: jest.fn(),
			actions: {
				createNode: jest.fn(),
			},
		} as unknown as SourceNodesArgs;

		const pluginOptions: PluginOptions = {
			feedURL: "https://some-feed-url",
			site: "bnf",
			userKey: "abc123",
		};

		it("should download feed", async () => {
			await sourceNodes(sourceNodesArgs, pluginOptions);

			expect(downloadFeed).toHaveBeenCalledTimes(1);
			expect(downloadFeed).toHaveBeenCalledWith(
				pluginOptions,
				"/img/d06535079bdf2fd3013f95f9d8830ee8/",
				expect.anything()
			);
		});

		it("should create Dental Practitioners’ Formulary node", async () => {
			await sourceNodes(sourceNodesArgs, pluginOptions);
			expect(sourceNodesArgs.actions.createNode).toHaveBeenNthCalledWith(5, {
				...mockFeed.dentalPractitionersFormulary,
				sections: [
					{
						order: 0,
						reviewDate: undefined,
						...mockFeed.dentalPractitionersFormulary.sections[0],
					},
				],
				order: 0,
				internal: expect.objectContaining({
					type: BnfNode.DentalPractitionersFormulary,
				}),
			});
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
