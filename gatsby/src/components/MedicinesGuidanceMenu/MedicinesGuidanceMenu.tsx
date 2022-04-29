import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import React, { type FC } from "react";

import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";

import { useMedicinesGuidancePages } from "@/hooks/useMedicinesGuidancePages";

export const MedicinesGuidanceMenu: FC = () => {
	const { pathname } = useLocation(),
		medicinesGuidancePages = useMedicinesGuidancePages();

	return (
		<StackedNav
			aria-label="Medicines guidance pages"
			label="Medicines guidance"
			link={{ destination: "/medicines-guidance/", elementType: Link }}
			id="collapsible-menu"
		>
			{medicinesGuidancePages.map(({ href, title }) => (
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
