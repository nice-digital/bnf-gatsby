import { Link } from "gatsby";
import React, { useMemo, type ReactNode, type ElementType } from "react";
import striptags from "striptags";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import { OnThisPage, type OnThisPageProps } from "../OnThisPage/OnThisPage";

import styles from "./DetailsPageLayout.module.scss";

type DetailsPageLayoutProps = {
	/** The ancestors from the parent page e.g. ["About"] */
	parentTitleParts?: string[];
	titleHtml: string;
	menu: ElementType;
	children: ReactNode;
	parentBreadcrumbs?: {
		href: string;
		text: string;
	}[];
	metaDescription?: string;
	sections: OnThisPageProps["sections"];
};

/**
 * A 3 column layout with menu, main content and 'on this page'
 */
export const DetailsPageLayout: React.FC<DetailsPageLayoutProps> = ({
	children,
	parentTitleParts = [],
	titleHtml,
	menu: Menu,
	parentBreadcrumbs = [],
	metaDescription,
	sections,
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
		<Layout>
			<SEO
				title={[titleNoHtml, ...parentTitleParts].filter(Boolean).join(" | ")}
				description={metaDescription}
			/>

			<Breadcrumbs>{breadcrumbElements}</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={<span dangerouslySetInnerHTML={{ __html: titleHtml }} />}
			/>

			<Grid gutter="loose" data-testid="body">
				<GridItem cols={12} md={4} lg={3} className="hide-print">
					<Menu />
				</GridItem>
				<GridItem cols={12} md={8} lg={9}>
					<Grid reverse gutter="loose">
						<GridItem cols={12} lg={3}>
							<OnThisPage sections={sections} />
						</GridItem>
						<GridItem className={styles.body} cols={12} lg={9}>
							{children}
						</GridItem>
					</Grid>
				</GridItem>
			</Grid>
		</Layout>
	);
};
