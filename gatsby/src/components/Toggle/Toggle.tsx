import classNames from "classnames";
import { type FC } from "react";

import ChevronDownIcon from "@nice-digital/icons/lib/ChevronDown";

import styles from "./Toggle.module.scss";

export interface ToggleProps {
	isOpen: boolean;
	className?: string;
}

export const Toggle: FC<ToggleProps> = ({ children, isOpen, className }) => (
	<span className={classNames(className, styles.label)}>
		<ChevronDownIcon
			className={classNames(styles.icon, { [styles.open]: isOpen })}
		/>
		{children}
	</span>
);
