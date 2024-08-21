import { Link } from "gatsby";
import React, {
	useMemo,
	type ReactNode,
	type ElementType,
	ReactElement,
} from "react";
import striptags from "striptags";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

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
}) => {
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
		<>
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
				data-testid="page-header"
			/>

			<Grid gutter="loose" data-testid="body">
				{Menu && (
					<>
						<GridItem cols={12} md={4} lg={3} className="hide-print">
							<Menu />
						</GridItem>
					</>
				)}
				<GridItem cols={12} md={Menu ? 8 : 12} lg={Menu ? 9 : 12}>
					{Menu ? (
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
					) : (
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
					)}
				</GridItem>
			</Grid>
		</>
	);
};
