import classNames from "classnames";
import { FC, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import striptags from "striptags";

import ChevronDownIcon from "@nice-digital/icons/lib/ChevronDown";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { isTruthy } from "@/utils";

import styles from "./SectionNav.module.scss";

export interface SectionLink {
	id: string;
	title: string;
}

export interface SectionNavProps {
	sections: (SectionLink | undefined)[];
	className?: string;
	readableMaxWidth?: boolean;
}

export const SectionNav: FC<SectionNavProps> = ({
	sections,
	className,
	readableMaxWidth = false,
}) => {
	const [isExpanded, setIsExpanded] = useState(true);
	const [isStuck, setIsStuck] = useState(false);
	const headingText = "Navigate to section";

	const ref = useRef<HTMLDivElement | null>(null);

	const entry = useIntersectionObserver(ref, {
		rootMargin: "-1px 0px 0px 0px",
		threshold: 0,
	});

	const toggleDropdown = () => {
		setIsExpanded(!isExpanded);
	};

	// Use intersection observer entry to check whether the sticky nav should display or not
	useEffect(() => {
		if (entry) {
			setIsStuck(!entry.isIntersecting);
		}
	}, [entry]);

	// Automatically collapse the nav whenever we enter sticky mode
	useEffect(() => {
		isStuck ? setIsExpanded(false) : setIsExpanded(true);
	}, [isStuck]);

	// We'll need to launch the sticky menu into a portal so it's in a sensible stacking context
	const portal: HTMLElement | null = document
		? document.getElementById("sticky-nav-portal")
		: null;

	return (
		<>
			<nav
				aria-labelledby="navigate-to-section"
				className={classNames(
					styles.nav,
					readableMaxWidth ? styles.navReadableMaxWidth : null,
					className
				)}
				ref={ref}
			>
				<h2 id="navigate-to-section" className={styles.heading}>
					<span>{headingText}</span>
				</h2>
				<ol
					aria-label="Jump links to sections on this page"
					className={styles.linkList}
				>
					{sections.filter(isTruthy).map((section) => (
						<li key={section?.id}>
							<a href={`#${section?.id}`} onClick={() => setIsExpanded(false)}>
								{striptags(section?.title || "")}
							</a>
						</li>
					))}
				</ol>
			</nav>
			{isStuck &&
				portal &&
				ReactDOM.createPortal(
					<nav
						aria-labelledby="sticky-navigate-to-section"
						className={classNames(
							styles.nav,
							styles.stuck,
							readableMaxWidth ? styles.navReadableMaxWidth : null,
							className
						)}
					>
						<div className={styles.fixed}>
							<div className="container">
								<h2 id="sticky-navigate-to-section" className={styles.heading}>
									<button
										type="button"
										className={styles.toggleButton}
										aria-label={`${
											isExpanded ? "Hide" : "Show"
										} ${headingText}`}
										aria-expanded={isExpanded}
										onClick={toggleDropdown}
										data-tracking={isExpanded}
									>
										<ChevronDownIcon
											className={classNames(
												styles.icon,
												isExpanded && styles.iconExpanded
											)}
										/>
										{headingText}
									</button>
								</h2>
								{isExpanded ? (
									<ol
										aria-label="Jump links to sections on this page"
										className={styles.linkList}
									>
										{sections.filter(isTruthy).map((section) => (
											<li key={section?.id}>
												<a
													href={`#${section?.id}`}
													onClick={() => setIsExpanded(false)}
												>
													{striptags(section?.title || "")}
												</a>
											</li>
										))}
									</ol>
								) : null}
							</div>
						</div>
					</nav>,
					portal
				)}
		</>
	);
};
