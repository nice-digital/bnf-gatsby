import { useState, type FC, type ReactNode } from "react";

import ChevronDownIcon from "@nice-digital/icons/lib/ChevronDown";

import styles from "./Accordion.module.scss";

export interface AccordionProps {
	title: ReactNode;
	children: ReactNode;
	defaultOpen?: boolean;
	showLabel?: string;
	hideLabel?: ReactNode;
}

export const Accordion: FC<AccordionProps> = ({
	title,
	children,
	defaultOpen = false,
	showLabel = "Show",
	hideLabel = "Hide",
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<details
			className={styles.details}
			onToggle={() => {
				setIsOpen((isOpen) => !isOpen);
			}}
			open={defaultOpen}
		>
			<summary className={styles.summary}>
				{typeof title === "string" || typeof title === "number" ? (
					<span>{title}</span>
				) : (
					title
				)}
				<span className={styles.toggleLabel}>
					<ChevronDownIcon className={styles.icon} />{" "}
					{isOpen ? hideLabel : showLabel}
				</span>
			</summary>
			{children}
		</details>
	);
};
