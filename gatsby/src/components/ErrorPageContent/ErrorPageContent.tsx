import { Announcer } from "@/components/Announcer/Announcer";

import { SEO } from "../SEO/SEO";

export const ErrorPageContent: React.FC = () => {
	// TODO error page content
	return (
		<>
			<SEO title={`Error`} />
			<Announcer announcement="An error occurred" />
			<p>Error page content</p>
		</>
	);
};
