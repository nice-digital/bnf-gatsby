import { Link } from "gatsby";
import React from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { SEO } from "../components/SEO/SEO";

import { isBNF } from "./../site";

const NotFoundPage: React.FC = () => {
	return (
		<>
			<SEO title="Page not found" noIndex={true} />
			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{isBNF ? "BNF" : "BNFC"}
				</Breadcrumb>
				<Breadcrumb>Page not found</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				heading={"We can't find this page"}
				lead={"Check that the web address has been typed correctly."}
			/>

			<p>You can also try:</p>
			<ul>
				<li>looking for it using the search box</li>
				<li>
					browsing for it from the{" "}
					<Link to="/">{isBNF ? "BNF" : "BNFC"} homepage</Link>.
				</li>
			</ul>
			<h2>Contact us</h2>
			<p>
				<a href="https://www.nice.org.uk/get-involved/contact-us">
					Get in touch
				</a>{" "}
				if you think there is a problem.
			</p>
		</>
	);
};

export default NotFoundPage;
