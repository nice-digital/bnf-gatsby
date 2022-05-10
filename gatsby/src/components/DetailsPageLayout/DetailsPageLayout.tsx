import { Link } from "gatsby";
import React, {
	useMemo,
	type ReactNode,
	type ElementType,
	ReactElement,
	useState,
	useLayoutEffect,
	useCallback,
} from "react";
import striptags from "striptags";

import ChevronDownIcon from "@nice-digital/icons/lib/ChevronDown";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import {
	OnThisPage,
	type OnThisPageProps,
} from "@/components/OnThisPage/OnThisPage";
import { SectionNav } from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import styles from "./DetailsPageLayout.module.scss";

type DetailsPageLayoutProps = {
	/** The ancestors from the parent page e.g. ["About"] */
	parentTitleParts?: string[];
	titleHtml: string;
	preheading?: string;
	menu?: ElementType;
	children: ReactNode;
	parentBreadcrumbs?: {
		href: string;
		text: string;
	}[];
	metaDescription?: string;
	sections: OnThisPageProps["sections"];
	asideContent?: ReactElement;
	headerCta?: ReactElement;
	useSectionNav?: boolean;
};

/**
 * A 3 column layout with menu, main content and 'on this page'
 */
export const DetailsPageLayout: React.FC<DetailsPageLayoutProps> = ({
	children,
	parentTitleParts = [],
	titleHtml,
	preheading,
	menu: Menu,
	parentBreadcrumbs = [],
	metaDescription,
	sections,
	asideContent,
	headerCta,
	useSectionNav,
}) => {
	const [isExpanded, setIsExpanded] = useState(true);
	const [isClient, setIsClient] = useState(false);

	useLayoutEffect(() => {
		setIsExpanded(false);
		setIsClient(true);
	}, []);

	const clickHandler = useCallback(() => {
		setIsExpanded((s) => !s);
	}, []);

	const { siteTitleShort } = useSiteMetadata(),
		titleNoHtml = striptags(titleHtml),
		breadcrumbElements = useMemo(
			() => [
				<Breadcrumb key="NICE" to="https://www.nice.org.uk/">
					NICE
				</Breadcrumb>,
				<Breadcrumb key="Home" to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>,
				...parentBreadcrumbs.map(({ href, text }) => (
					<Breadcrumb key={href} to={href} elementType={Link}>
						{text}
					</Breadcrumb>
				)),
				<Breadcrumb key="Current page">{titleNoHtml}</Breadcrumb>,
			],
			[siteTitleShort, titleNoHtml, parentBreadcrumbs]
		);

	return (
		<Layout>
			<SEO
				title={[titleNoHtml, ...parentTitleParts].filter(Boolean).join(" | ")}
				description={metaDescription}
			/>

			<Breadcrumbs>{breadcrumbElements}</Breadcrumbs>

			<PageHeader
				id="content-start"
				preheading={
					preheading ? (
						<span dangerouslySetInnerHTML={{ __html: preheading }} />
					) : undefined
				}
				heading={<span dangerouslySetInnerHTML={{ __html: titleHtml }} />}
				cta={headerCta}
			/>

			<Grid gutter="loose" data-testid="body">
				{Menu && (
					<>
						<GridItem cols={12} md={4} lg={3} className="hide-print">
							{isClient ? (
								<button
									type="button"
									className={styles.toggleButton}
									onClick={clickHandler}
									aria-expanded={isExpanded}
									aria-label={`${isExpanded ? "Collapse" : "Expand"} menu for ${
										parentBreadcrumbs[parentBreadcrumbs.length - 1].text
									}`}
								>
									{parentBreadcrumbs[parentBreadcrumbs.length - 1].text}{" "}
									<ChevronDownIcon className={styles.icon} />
								</button>
							) : (
								<a className={styles.toggleButton} href="#collapsible-menu">
									{parentBreadcrumbs[parentBreadcrumbs.length - 1].text}{" "}
									<ChevronDownIcon className={styles.icon} />
								</a>
							)}
							<Menu />
						</GridItem>
					</>
				)}
				<GridItem cols={12} md={Menu ? 8 : 12} lg={Menu ? 9 : 12}>
					{useSectionNav && !asideContent ? (
						<Grid gutter="loose">
							<GridItem cols={12} md={Menu ? 12 : 8} lg={Menu ? 12 : 9}>
								<SectionNav sections={sections} />
							</GridItem>
							<GridItem
								className={styles.body}
								cols={12}
								md={Menu ? 12 : 8}
								lg={Menu ? 12 : 9}
							>
								{children}
							</GridItem>
						</Grid>
					) : (
						<Grid reverse gutter="loose">
							<GridItem cols={12} lg={3}>
								{asideContent ? (
									asideContent
								) : (
									<OnThisPage sections={sections} />
								)}
							</GridItem>
							<GridItem className={styles.body} cols={12} lg={9}>
								{asideContent && (
									<SectionNav
										className={styles.sectionNav}
										sections={sections}
									/>
								)}
								{children}
							</GridItem>
						</Grid>
					)}
				</GridItem>
			</Grid>
		</Layout>
	);
};
