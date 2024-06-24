export async function acceptEULA(): Promise<void> {
	const EULAAcceptButton = await $("#btn-accept-bnf-eula");

	if (await EULAAcceptButton.isDisplayed()) await EULAAcceptButton.click();
}
