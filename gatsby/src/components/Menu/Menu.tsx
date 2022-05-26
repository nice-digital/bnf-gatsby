import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import React, {
	ElementType,
	useCallback,
	useLayoutEffect,
	useState,
	type FC,
} from "react";

import ChevronDownIcon from "@nice-digital/icons/lib/ChevronDown";
import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";

import { decapitalize } from "@/utils";

import styles from "./Menu.module.scss";

export interface MenuProps {
	ariaLabel?: string;
	label: string;
	link: { destination: string; elementType: ElementType; isCurrent?: boolean };
	pages: {
		href: string;
		title: string;
	}[];
}

export const Menu: FC<MenuProps> = ({ ariaLabel, label, link, pages }) => {
	const { pathname } = useLocation();

	const [isExpanded, setIsExpanded] = useState(true);
	const [isClient, setIsClient] = useState(false);

	useLayoutEffect(() => {
		setIsExpanded(false);
		setIsClient(true);
	}, []);

	const clickHandler = useCallback(() => {
		setIsExpanded((s) => !s);
	}, []);

	const currentPageTitle =
		pages.find(({ href }) => href == pathname)?.title || label;

	return (
		<>
			{" "}
			{isClient ? (
				<button
					type="button"
					className={styles.toggleButton}
					onClick={clickHandler}
					aria-expanded={isExpanded}
					aria-label={`${
						isExpanded ? "Collapse" : "Expand"
					} menu for ${decapitalize(ariaLabel || `${label} pages`)}`}
				>
					<span dangerouslySetInnerHTML={{ __html: currentPageTitle }} />{" "}
					<ChevronDownIcon className={styles.icon} />
				</button>
			) : (
				<a className={styles.toggleButton} href="#collapsible-menu">
					<span dangerouslySetInnerHTML={{ __html: currentPageTitle }} />
					<ChevronDownIcon className={styles.icon} />
				</a>
			)}
			<StackedNav
				aria-label={ariaLabel || `${label} pages`}
				label={label}
				link={link}
				id="collapsible-menu"
			>
				{pages.map(({ href, title }) => (
					<StackedNavLink
						key={href}
						destination={href}
						elementType={Link}
						isCurrent={href === pathname}
					>
						<span dangerouslySetInnerHTML={{ __html: title }} />
					</StackedNavLink>
				))}
			</StackedNav>
		</>
	);
};
