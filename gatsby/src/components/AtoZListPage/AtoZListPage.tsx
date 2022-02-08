import { Link } from "gatsby";
import { type FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export interface AtoZLink {
	title: string;
	slug: string;
}

export interface AtoZLetter {
	letter: string;
	links: AtoZLink[];
}

export interface AtoZListPageProps {
	title: string;
	path: string;
	letters: AtoZLetter[];
}

const byTitleAlphabetically = (a: AtoZLink, b: AtoZLink) =>
	a.title.localeCompare(b.title);

export const AtoZListPage: FC<AtoZListPageProps> = ({
	title,
	path,
	letters,
}) => {
	const { siteTitleShort } = useSiteMetadata();

	return (
		<Layout>
			<SEO title={`${title} A to Z`} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb>{`${title} A to Z`}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader id="content-start" heading={<>{title} A&nbsp;to&nbsp;Z</>} />

			<ol>
				{letters.map(({ letter, links }) => (
					<li key={letter}>
						<h2>{letter}</h2>

						<ol>
							{links.sort(byTitleAlphabetically).map(({ title, slug }) => (
								<li key={slug}>
									<Link
										to={`/${path}/${slug}/`}
										dangerouslySetInnerHTML={{ __html: title }}
									/>
								</li>
							))}
						</ol>
					</li>
				))}
			</ol>
		</Layout>
	);
};
