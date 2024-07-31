export async function cookiesToggle(type: "on" | "off"): Promise<void> {
	const essentialCookie = await $(
		"#ccc-optional-categories > div:nth-child(1) > div > label"
	);
	essentialCookie.isDisplayed;
	essentialCookie.scrollIntoView();

	if (type == "off") {
		await essentialCookie.click();
	}
	//to switch off cookies selection
	else await essentialCookie.click();
}
export async function WebsiteUsagecookiesToggle(
	type: "on" | "off"
): Promise<void> {
	const websiteUsageCookie = await $(
		"#ccc-optional-categories > div:nth-child(2) > div > label"
	);
	await websiteUsageCookie.isDisplayed();
	await websiteUsageCookie.scrollIntoView();

	if (type == "off") {
		await websiteUsageCookie.click();
	}
	//to switch off cookies selection
	else await websiteUsageCookie.click();
}
export async function marketingCookiesToggle(
	type: "on" | "off"
): Promise<void> {
	const marketingCookie = await $(
		"#ccc-optional-categories > div:nth-child(3) > div > label"
	);
	await marketingCookie.isDisplayed();
	await marketingCookie.scrollIntoView();

	if (type == "off") {
		await marketingCookie.click();
	}
	//to switch off cookies selection
	else await marketingCookie.click();
}

export default cookiesToggle;
