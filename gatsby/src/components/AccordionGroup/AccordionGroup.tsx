import { useEffect, useState, type FC, type ReactNode } from "react";

import { useIsClient } from "@/hooks/useIsClient";

import { AccordionGroupProvider } from "../AccordionGroupContext/AccordionGroupContext";
import { Toggle } from "../Toggle/Toggle";

import styles from "./AccordionGroup.module.scss";

export interface AccordionGroupProps {
	children: ReactNode;
	toggleText?: (isOpen: boolean) => ReactNode;
	onToggle?: (isOpen: boolean) => void;
}

export const AccordionGroup: FC<AccordionGroupProps> = ({
	children,
	toggleText = (isOpen) => `${isOpen ? "Hide" : "Show"} all sections`,
	onToggle,
}) => {
	const [isGroupOpen, setIsGroupOpen] = useState(false),
		isClient = useIsClient(),
		toggleClickHandler = () => {
			setIsGroupOpen((isGroupOpen) => !isGroupOpen);
		};

	useEffect(() => {
		if (onToggle) onToggle(isGroupOpen);
	}, [onToggle, isGroupOpen]);

	return (
		<AccordionGroupProvider isGroupOpen={isGroupOpen}>
			{isClient ? (
				<button
					type="button"
					aria-expanded={isGroupOpen}
					className={styles.toggleButton}
					data-tracking={
						isGroupOpen ? "Hide all sections" : "Show all sections"
					}
					onClick={toggleClickHandler}
				>
					<Toggle isOpen={isGroupOpen}>{toggleText(isGroupOpen)}</Toggle>
				</button>
			) : null}
			{children}
		</AccordionGroupProvider>
	);
};
