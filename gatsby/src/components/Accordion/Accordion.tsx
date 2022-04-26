import { useState, type FC, type ReactNode } from "react";

import ChevronDownIcon from "@nice-digital/icons/lib/ChevronDown";

import styles from "./Accordion.module.scss";

export enum AccordionTheme {
	Warning,
}
export interface AccordionProps {
	title: ReactNode;
	children: ReactNode;
	defaultOpen?: boolean;
	showLabel?: string;
	hideLabel?: ReactNode;
	className?: string;
	theme?: AccordionTheme;
}

export const Accordion: FC<AccordionProps> = ({
	title,
	children,
	defaultOpen = false,
	showLabel = "Show",
	hideLabel = "Hide",
	className,
	theme,
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);
	const themeClass =
		theme === AccordionTheme.Warning ? styles.warningTheme : "";

	return (
		<details
			className={[styles.details, className, themeClass].join(" ")}
			onToggle={(e) => {
				e.stopPropagation(); // Ensure event isn't passed to parent accordions
				setIsOpen((isOpen) => !isOpen);
			}}
			open={defaultOpen}
		>
			<summary
				className={styles.summary}
				data-tracking={isOpen ? hideLabel : showLabel}
			>
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
