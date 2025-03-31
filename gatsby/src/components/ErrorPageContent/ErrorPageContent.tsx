import { Announcer } from "@/components/Announcer/Announcer";

import { SEO } from "../SEO/SEO";

export const ErrorPageContent: React.FC = () => {
	// TODO error page content
	return (
		<>
			<SEO title={`Error`} />
			<Announcer announcement="An error occurred" />
			<p>
				Sorry, there has been a problem, and we cannot load the page you are
				looking for. Please try again.
			</p>
			<p>
				If you get this message more than once, please report it using our
				feedback form : <a> https://www.nice.org.uk/forms/leave-feedback</a>
			</p>
		</>
	);
};
