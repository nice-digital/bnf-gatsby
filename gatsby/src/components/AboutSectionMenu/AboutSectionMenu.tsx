import { Link } from "gatsby";
import React, { type FC } from "react";

import { useAboutPages } from "@/hooks/useAboutPages";

import { Menu } from "../Menu/Menu";

export const AboutSectionMenu: FC = () => {
	const aboutPages = useAboutPages();

	return (
		<Menu
			ariaLabel="About section pages"
			label="About"
			link={{ destination: "/about/", elementType: Link }}
			pages={aboutPages}
		></Menu>
	);
};
