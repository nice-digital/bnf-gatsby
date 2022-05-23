import { Link } from "gatsby";
import React, { type FC } from "react";

import { useBorderlineSubstancesPages } from "@/hooks/useBorderlineSubstancesPages";

import { Menu } from "../Menu/Menu";

export const BorderlineSubstancesMenu: FC = () => {
	const topLevel = useBorderlineSubstancesPages();

	return (
		<Menu
			label="Borderline substances"
			link={{ destination: "/borderline-substances/", elementType: Link }}
			pages={topLevel}
		></Menu>
	);
};
