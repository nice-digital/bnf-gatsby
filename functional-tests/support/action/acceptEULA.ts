export async function acceptEULA(): Promise<void> {
	const EULAAcceptButton = await $("#btn-accept-bnf-eula");

	if (await EULAAcceptButton.isDisplayed()) {
		await EULAAcceptButton.scrollIntoView();
		await EULAAcceptButton.click();
	} else {
		await $(".SubNav-module--link--24753:nth-child(1)");
		await browser.pause(2000);
	}
}
export default acceptEULA;
