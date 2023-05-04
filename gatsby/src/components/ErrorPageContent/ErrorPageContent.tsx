import { Announcer } from "@/components/Announcer/Announcer";

import { NEWSEO } from "../SEO/NEWSEO";

export function Head(): JSX.Element {
	return <NEWSEO title="Error" />;
}

export const ErrorPageContent: React.FC = () => {
	// TODO error page content
	return (
		<>
			<Announcer announcement="An error occurred" />
			<p>Error page content</p>
		</>
	);
};
