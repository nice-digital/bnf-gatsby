// Let TypeScript know we're importing SCSS (and SCSS modules)
// Avoids "Can't import CSS/SCSS modules. TypeScript says “Cannot Find Module”"
// See https://stackoverflow.com/a/41946697/486434
declare module "*.module.scss" {
	const content: { [className: string]: string };
	export default content;
}

// So that we can import JSON files in TypeScript.
declare module "*.json" {
	const value: unknown;

	export default value;
}
