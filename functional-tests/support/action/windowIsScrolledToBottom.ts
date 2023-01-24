export async function windowIsScrolledToBottom(): Promise<boolean> {
	return browser.execute(
		() =>
			Math.ceil(window.innerHeight + window.pageYOffset) >=
			document.body.offsetHeight
	);
}
