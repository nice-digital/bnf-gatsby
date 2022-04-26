import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import React, { type FC } from "react";

import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";

import { useBorderlineSubstancesPage } from "@/hooks/useBorderlineSubstancesPage";

export const BorderlineSubstancesMenu: FC = () => {
	const { pathname } = useLocation(),
		topLevel = useBorderlineSubstancesPage();

	return (
		<StackedNav
			aria-label="Borderline Substances"
			label="Borderline Substances"
			link={{ destination: "/borderline-substances/", elementType: Link }}
		>
			{topLevel.map(({ href, title }) => (
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
