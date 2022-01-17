export async function waitForTitleToChange(
	oldTitle: string,
	timeout = 5000
): Promise<void> {
	await browser.waitUntil(async () => (await browser.getTitle()) !== oldTitle, {
		timeout,
		timeoutMsg: `Page title was still '${oldTitle}' after ${timeout}ms`,
	});
}
