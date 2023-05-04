import * as fsPromises from "fs/promises";
import path, { sep } from "path";

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

			expect(imagesBasePath).toBe("/img/f99313de4f9cb568532e1620ea5cad5c/");
		});

		it("should write each file to the public folder", async () => {
			await extractImageZIP(zipBuffer, reporter);

			const mocked = fsPromises as jest.Mocked<typeof fsPromises>;

			expect(mocked.writeFile).toHaveBeenCalledTimes(2);
			expect(mocked.writeFile.mock.calls[0][0]).toEndWith(
				`${sep}img${sep}f99313de4f9cb568532e1620ea5cad5c${sep}blue.png`
			);
		});
	});
});
