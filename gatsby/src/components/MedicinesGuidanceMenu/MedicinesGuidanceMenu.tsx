import { Link } from "gatsby";
import React, { type FC } from "react";

import { useMedicinesGuidancePages } from "@/hooks/useMedicinesGuidancePages";

import { Menu } from "../Menu/Menu";

export const MedicinesGuidanceMenu: FC = () => {
	const medicinesGuidancePages = useMedicinesGuidancePages();

	return (
		<Menu
			label="Medicines guidance"
			link={{ destination: "/medicines-guidance/", elementType: Link }}
			pages={medicinesGuidancePages}
		></Menu>
	);
};
