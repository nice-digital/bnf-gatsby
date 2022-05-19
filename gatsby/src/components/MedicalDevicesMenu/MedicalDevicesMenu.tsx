import { Link } from "gatsby";
import React, { type FC } from "react";

import { useMedicalDevicePages } from "@/hooks/useMedicalDevicePages";

import { Menu } from "../Menu/Menu";

export const MedicalDevicesMenu: FC = () => {
	const medicalDevicePages = useMedicalDevicePages();

	return (
		<Menu
			ariaLabel="Medical device pages"
			label="Medical devices"
			link={{ destination: "/medical-devices/", elementType: Link }}
			pages={medicalDevicePages}
		></Menu>
	);
};
