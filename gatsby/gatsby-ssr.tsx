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

	replaceHeadComponents(components);
};

export const wrapPageElement = ({
	element,
	props,
}: WrapPageElementBrowserArgs): ReactElement => (
	<Layout {...props}>{element}</Layout>
);
