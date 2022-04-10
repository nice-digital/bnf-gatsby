import * as fsPromises from "fs/promises";
import path from "path";

import { extractImageZIP } from "./";

jest.mock("fs/promises");

const { readFile } = jest.requireActual("fs/promises") as typeof fsPromises;

describe("images-unzipper", () => {
	const panic = jest.fn(),
		activityTimer = jest.fn().mockReturnValue({
			start: jest.fn(),
			end: jest.fn(),
			setStatus: jest.fn(),
			panic: panic,
		}),
		reporter = {
			activityTimer,
		};

	describe("extractImageZIP", () => {
		let zipBuffer: Buffer;
		beforeAll(async () => {
			// Mock-images.zip is a ZIP with 2 1x1 coloured (1 blue, 1 red) pixel images for testing
			zipBuffer = await readFile(
				path.join(__dirname, "../", "mock-images.zip")
			);
		});

		it("should return image base path with hash of image zip", async () => {
			const imagesBasePath = await extractImageZIP(zipBuffer, reporter);

			expect(imagesBasePath).toBe("/img/d06535079bdf2fd3013f95f9d8830ee8/");
		});

		it("should write each file to the public folder", async () => {
			await extractImageZIP(zipBuffer, reporter);

			const mocked = fsPromises as jest.Mocked<typeof fsPromises>;

			expect(mocked.writeFile).toHaveBeenCalledTimes(2);
			expect(mocked.writeFile.mock.calls[0][0]).toEndWith(
				"\\img\\d06535079bdf2fd3013f95f9d8830ee8\\blue.png"
			);
		});
	});
});
