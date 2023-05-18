import {
	type PreRenderHTMLArgs,
	type WrapPageElementBrowserArgs,
} from "gatsby";
import React, { type ReactElement } from "react";

import { Layout } from "@/components/Layout/Layout";

export const onPreRenderHTML = ({
	getHeadComponents,
	replaceHeadComponents,
}: PreRenderHTMLArgs): void => {
	const components = getHeadComponents();

	components.push(
		<script
			src={process.env.GATSBY_COOKIE_BANNER_URL}
			type="text/javascript"
			key="cookie-banner"
			async
		></script>
	);

	// Add Google Fonts
	components.push(
		<>
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
			<link
				href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Lora:ital,wght@0,400;0,600;1,400;1,600&display=swap"
				rel="stylesheet"
			/>
		</>
	);

	replaceHeadComponents(components);
};

export const wrapPageElement = ({
	element,
	props,
}: WrapPageElementBrowserArgs): ReactElement => (
	<Layout {...props}>{element}</Layout>
);
