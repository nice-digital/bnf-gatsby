import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import React, { type FC } from "react";

import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";

import { useNursePrescribers } from "@/hooks/useNursePrescribers";

export const NursePrescribersFormularyMenu: FC = () => {
	const { pathname } = useLocation(),
		nursePrescribers = useNursePrescribers();

	return (
		<StackedNav
			aria-label="Nurse Prescribers' Formulary"
			label="Nurse Prescribers' Formulary treatment summaries"
			link={{ destination: "/Nurse-Prescribers-Formulary/", elementType: Link }}
		>
			{nursePrescribers.map(({ href, title }) => (
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
