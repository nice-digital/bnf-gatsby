import classNames from "classnames";
import { Link } from "gatsby";
import { FC, useState, useRef } from "react";
import striptags from "striptags";

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
	navigateToAnotherPage?: boolean;
}

export const SectionNav: FC<SectionNavProps> = ({
	sections,
	className,
	readableMaxWidth = false,
	navigateToAnotherPage = false,
}) => {
	// const [isDropdownVisible, setIsDropdownVisible] = useState(true);
	const headingText = navigateToAnotherPage
		? "Navigate to page"
		: "Navigate to section";

	const ref = useRef<HTMLDivElement | null>(null);
	const entry = useIntersectionObserver(ref, {
		rootMargin: "-1px 0px",
		threshold: 1,
	});
	const isStuck = !entry?.isIntersecting;
	console.log("Is stuck?", isStuck);

	const toggleDropdown = () => {
		console.log("TOGGLE TIME!");
	};

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
			<h2 id="navigate-to-section" className={styles.heading}>
				{isStuck ? (
					<button type="button" onClick={toggleDropdown}>
						{headingText}
					</button>
				) : (
					<span>{headingText}</span>
				)}
			</h2>
			<ol
				aria-label="Jump links to sections on this page"
				className={styles.linkList}
			>
				{sections.filter(isTruthy).map((section) => (
					<li key={section?.id}>
						{navigateToAnotherPage ? (
							<Link to={section?.id}>{striptags(section?.title || "")}</Link>
						) : (
							<a href={`#${section?.id}`}>{striptags(section?.title || "")}</a>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};
