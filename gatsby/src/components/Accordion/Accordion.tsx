import {
	SyntheticEvent,
	useEffect,
	useState,
	type FC,
	type ReactNode,
} from "react";

import {
	useAccordionGroup,
	AccordionGroupProvider,
} from "../AccordionGroupContext/AccordionGroupContext";
import { Toggle } from "../Toggle/Toggle";

import styles from "./Accordion.module.scss";

const supportsDetailsElement =
	typeof document === "undefined" ||
	"open" in document.createElement("details");

export enum AccordionTheme {
	Warning,
}

export interface AccordionProps {
	title: ReactNode;
	children: ReactNode;
	open?: boolean;
	showLabel?: string;
	hideLabel?: ReactNode;
	className?: string;
	theme?: AccordionTheme;
}

export const Accordion: FC<AccordionProps> = ({
	title,
	children,
	open = false,
	showLabel = "Show",
	hideLabel = "Hide",
	className,
	theme,
}) => {
	const [isOpen, setIsOpen] = useState(open),
		themeClass = theme === AccordionTheme.Warning ? styles.warningTheme : "",
		{ isGroupOpen } = useAccordionGroup(),
		summaryClickHandler = () => {
			// Fallback for IE11/other browsers not supporting details/summary natively
			if (!supportsDetailsElement) setIsOpen((wasOpen) => !wasOpen);
		};

	// Handle the group being expanded/collapsed
	useEffect(() => {
		setIsOpen(isGroupOpen);
	}, [isGroupOpen]);

	// Handle the prop changing
	useEffect(() => {
		setIsOpen(open);
	}, [open]);

	return (
		<details
			className={[styles.details, className, themeClass].join(" ")}
			onToggle={(e: SyntheticEvent<HTMLDetailsElement>) => {
				e.stopPropagation(); // Ensure event isn't passed to parent accordions
				setIsOpen(e.currentTarget.open);
			}}
			open={isOpen}
		>
			<summary
				className={styles.summary}
				onClick={summaryClickHandler}
				data-tracking={isOpen ? hideLabel : showLabel}
			>
				<Toggle isOpen={isOpen} className={styles.toggleLabel}>
					{isOpen ? hideLabel : showLabel}
				</Toggle>{" "}
				{typeof title === "string" || typeof title === "number" ? (
					<span>{title}</span>
				) : (
					title
				)}
			</summary>
			{/* Avoid accordion groups opening nested accordions */}
			<AccordionGroupProvider isGroupOpen={false}>
				{children}
			</AccordionGroupProvider>
		</details>
	);
};
