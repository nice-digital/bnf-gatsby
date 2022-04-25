import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import React, { type FC } from "react";

import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";

import { useMedicalDevicePages } from "@/hooks/useMedicalDevicePages";

export const MedicalDevicesMenu: FC = () => {
	const { pathname } = useLocation(),
		medicalDevicePages = useMedicalDevicePages();

	return (
		<StackedNav
			aria-label="Medical device pages"
			label="Medical devices"
			link={{ destination: "/medical-devices/", elementType: Link }}
		>
			{medicalDevicePages.map(({ href, title }) => (
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
