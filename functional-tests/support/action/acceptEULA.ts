export async function acceptEULA(): Promise<void> {
	const EULAAcceptButton = await $("#btn-accept-bnf-eula");
	await EULAAcceptButton.waitForExist({ timeout: 5000 });

	if (await EULAAcceptButton.isDisplayed()) await EULAAcceptButton.click();
}
