import { createHash } from "crypto";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

import { type Reporter } from "gatsby";
import JSZip from "jszip";

export type ImagesBasePath = `/img/${string}/`;

/** Download the ZIP of images from the feed and extracts it to the public folder.
 *
 * @returns The relative base path for the extracted images.
 */
export const extractImageZIP = async (
	zipBuffer: Buffer,
	{ activityTimer }: Pick<Reporter, "activityTimer">
): Promise<ImagesBasePath> => {
	// Create a hash of the file contents for a long-cacheable URL path
	const zipHashFolder = createHash("md4").update(zipBuffer).digest("hex"),
		baseImagesPath = path.join(process.cwd(), "public", "img", zipHashFolder),
		zip = await JSZip().loadAsync(zipBuffer),
		files = Object.keys(zip.files);

	const extractActivity = activityTimer(`Extract images ZIP`);
	extractActivity.start();

	try {
		extractActivity.setStatus(`Making path ${baseImagesPath}`);
		await mkdir(baseImagesPath, { recursive: true });

		const fileWritePromises: Promise<void>[] = [];
		for (const fileName of files) {
			const fileBuffer = await zip.files[fileName].async("nodebuffer"),
				outputPath = path.join(baseImagesPath, fileName);

			extractActivity.setStatus(`Writing ${fileName}`);
			fileWritePromises.push(
				writeFile(outputPath, fileBuffer, {
					flag: "w",
				})
			);
		}

		await Promise.all(fileWritePromises);
	} catch (e) {
		extractActivity.panic("Error extracting zip file of images", e);
		throw "Error extracting zip file of images";
	}

	extractActivity.setStatus(
		`Extracted ${files.length} files to ${baseImagesPath}`
	);
	extractActivity.end();

	// This is the base path of images, served within a img folder that we can use for a long-cache time, but with a hashed path from the ZIP contents.
	// This results in a new URL when there's a change to the ZIP file contents
	return `/img/${zipHashFolder}/`;
};
