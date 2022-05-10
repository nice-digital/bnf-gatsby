import React, { type FC } from "react";

import { useMedicinesGuidancePages } from "@/hooks/useMedicinesGuidancePages";

import { Menu } from "../Menu/Menu";

export const MedicinesGuidanceMenu: FC = () => {
	const medicinesGuidancePages = useMedicinesGuidancePages();

	return (
		<Menu
			label="Medicines guidance"
			link="/medicines-guidance/"
			pages={medicinesGuidancePages}
		></Menu>
	);
};
