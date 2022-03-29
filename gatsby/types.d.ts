// Mock window.dataLayer, part of GTM. Global nav header relies on this
export type DataLayerEntry = {
	location?: string;
	event?: string;
};

declare global {
	interface Window {
		dataLayer: Array<DataLayerEntry>;
	}
}
