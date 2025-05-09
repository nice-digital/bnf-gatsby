import { Announcer } from "@/components/Announcer/Announcer";

import { SEO } from "../SEO/SEO";

import styles from "./ErrorPageContent.module.scss";

export const ErrorPageContent: React.FC = () => {
	// TODO error page content
	return (
		<>
			<SEO title={`Error`} />
			<Announcer announcement="An error occurred" />
			<h1 className={styles.errorHeading}>Sorry, there has been a problem</h1>
			<p className="lead">We cannot load the page you are looking for.</p>
			<p className="lead">Please try again.</p>
			<p className="body">
				If you get this message more than once, please report it using our
				feedback form:
				<a href="https://www.nice.org.uk/forms/leave-feedback">
					{" "}
					https://www.nice.org.uk/forms/leave-feedback
				</a>
			</p>
		</>
	);
};
