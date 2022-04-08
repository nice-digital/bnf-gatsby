// nice-icons doesn't come with typescript defs
// for the react components

declare module "@nice-digital/icons/lib/Print" {
	import { type FC } from "react";

	export interface IconProps {
		colour?: string;
		[key: string]: unknown;
	}

	const PrintIcon: FC<IconProps>;

	export default PrintIcon;
}

declare module "@nice-digital/icons/lib/ChevronDown" {
	export interface IconProps {
		colour?: string;
		[key: string]: unknown;
	}

	const ChevronDownIcon: FC<IconProps>;

	export default ChevronDownIcon;
}

declare module "@nice-digital/icons/lib/ChevronUp" {
	export interface IconProps {
		colour?: string;
		[key: string]: unknown;
	}

	const ChevronUpIcon: FC<IconProps>;

	export default ChevronUpIcon;
}
declare module "@nice-digital/icons/lib/Remove" {
	export interface IconProps {
		colour?: string;
		[key: string]: unknown;
	}

	const RemoveIcon: FC<IconProps>;

	export default RemoveIcon;
}
