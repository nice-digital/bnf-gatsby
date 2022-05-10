import React, { type FC } from "react";

import { useNursePrescribers } from "@/hooks/useNursePrescribers";

import { Menu } from "../Menu/Menu";

export const NursePrescribersFormularyMenu: FC = () => {
	const { menuList } = useNursePrescribers();

	return (
		<Menu
			label="Nurse Prescribers' Formulary"
			link="/nurse-prescribers-formulary/"
			pages={menuList}
		></Menu>
	);
};
