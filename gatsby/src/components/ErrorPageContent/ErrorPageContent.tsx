import { Announcer } from "@/components/Announcer/Announcer";

import { Layout } from "../Layout/Layout";
import { SEO } from "../SEO/SEO";

export const ErrorPageContent: React.FC = () => {
	// TODO error page content
	return (
		<Layout>
			<SEO title={`Error`} />
			<Announcer announcement="An error occurred" />
			<p>Error page content</p>
		</Layout>
	);
};
