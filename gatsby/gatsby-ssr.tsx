import { PreRenderHTMLArgs } from "gatsby";
import React from "react";

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
