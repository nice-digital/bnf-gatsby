import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import React, { type FC } from "react";

import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";

import { useAboutPages } from "@/hooks/useAboutPages";

export const AboutSectionMenu: FC = () => {
	const { pathname } = useLocation(),
		aboutPages = useAboutPages();

	return (
		<StackedNav
			aria-label="About section pages"
			label="About"
			link={{ destination: "/about/", elementType: Link }}
			id="collapsible-menu"
		>
			{aboutPages.map(({ href, title }) => (
				<StackedNavLink
					key={href}
					destination={href}
					elementType={Link}
					isCurrent={href === pathname}
				>
					<span dangerouslySetInnerHTML={{ __html: title }} />
				</StackedNavLink>
			))}
		</StackedNav>
	);
};
