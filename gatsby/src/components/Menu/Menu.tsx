import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import React, { type FC } from "react";

import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";

export interface MenuProps {
	ariaLabel?: string;
	label: string;
	link: string;
	pages: {
		href: string;
		title: string;
	}[];
}

export const Menu: FC<MenuProps> = ({ ariaLabel, label, link, pages }) => {
	const { pathname } = useLocation();

	return (
		<StackedNav
			aria-label={ariaLabel || `${label} pages`}
			label={label}
			link={{ destination: link, elementType: Link }}
			id="collapsible-menu"
		>
			{pages.map(({ href, title }) => (
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
