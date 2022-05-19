import { Link } from "gatsby";
import React, { type FC } from "react";

import { useNursePrescribers } from "@/hooks/useNursePrescribers";

import { Menu } from "../Menu/Menu";

export const NursePrescribersFormularyMenu: FC = () => {
	const { menuList } = useNursePrescribers();

	return (
		<Menu
			label="Nurse Prescribers' Formulary"
			link={{ destination: "/nurse-prescribers-formulary/", elementType: Link }}
			pages={menuList}
		></Menu>
	);
};
