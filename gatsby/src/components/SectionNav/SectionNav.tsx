import classNames from "classnames";
import { FC, useState, useRef, useEffect } from "react";
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
	const [isExpanded, setIsExpanded] = useState(false);
	const headingText = "Navigate to section";

	const ref = useRef<HTMLDivElement | null>(null);

	const entry = useIntersectionObserver(ref, {
		rootMargin: "-1px 0px 0px 0px",
		threshold: 1,
	});
	const isStuck = !entry?.isIntersecting;

	const toggleDropdown = () => {
		setIsExpanded(!isExpanded);
	};

	useEffect(() => {
		isStuck ? setIsExpanded(false) : setIsExpanded(true);
	}, [isStuck]);

	return (
		<nav
			aria-labelledby="navigate-to-section"
			className={classNames(
				styles.nav,
				readableMaxWidth ? styles.navReadableMaxWidth : null,
				isStuck ? styles.stuck : null,
				className
			)}
			ref={ref}
		>
			<div className={isStuck ? styles.fixed : ""}>
				<div className={isStuck ? "container" : ""}>
					<h2 id="navigate-to-section" className={styles.heading}>
						{isStuck ? (
							<button
								type="button"
								className={styles.toggleButton}
								aria-label={`${isExpanded ? "Hide" : "Show"} ${headingText}`}
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
						) : (
							<span>{headingText}</span>
						)}
					</h2>
					{isExpanded ? (
						<ol
							aria-label="Jump links to sections on this page"
							className={styles.linkList}
						>
							{sections.filter(isTruthy).map((section) => (
								<li key={section?.id}>
									<a href={`#${section?.id}`}>
										{striptags(section?.title || "")}
									</a>
								</li>
							))}
						</ol>
					) : null}
				</div>
			</div>
		</nav>
	);
};
