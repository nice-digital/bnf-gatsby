import { Link } from "gatsby";
import { type FC } from "react";

import { AZList, AZListItem } from "@nice-digital/nds-a-z-list";
import { Alert } from "@nice-digital/nds-alert";
import { Alphabet, Letter } from "@nice-digital/nds-alphabet";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { ColumnList } from "@nice-digital/nds-column-list";
import { PageHeader } from "@nice-digital/nds-page-header";

import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import { InteractionsAlert } from "../InteractionsAlert/InteractionsAlert";

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
	metaDescription: string;
	path: string;
	letters: AtoZLetter[];
	pageDescription: string;
}

const byTitleAlphabetically = (a: AtoZLink, b: AtoZLink) =>
	a.title.localeCompare(b.title);

export const AtoZListPage: FC<AtoZListPageProps> = ({
	title,
	metaDescription,
	path,
	letters,
	pageDescription,
}) => {
	const { siteTitleShort } = useSiteMetadata();

	const alphabet = () => (
		<Alphabet>
			{letters.map(({ letter }) => (
				<Letter key={letter} to={`#${letter}`}>
					{letter.trim().toUpperCase() || "n/a"}
				</Letter>
			))}
		</Alphabet>
	);

	return (
		<>
			<SEO title={`${title} A to Z`} description={metaDescription} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb>{`${title} A to Z`}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={<>{title} A&nbsp;to&nbsp;Z</>}
				lead={pageDescription}
			/>
			<InteractionsAlert />

			<AZList alphabet={alphabet}>
				{letters.map(({ letter, links }) => (
					<AZListItem key={letter} title={letter.toUpperCase()}>
						<ColumnList
							aria-labelledby={letter}
							data-tracking="a-to-z-column-list"
						>
							{links.sort(byTitleAlphabetically).map(({ title, slug }) => (
								<li key={slug}>
									<Link
										to={`/${path}/${slug}/`}
										dangerouslySetInnerHTML={{ __html: title }}
									/>
								</li>
							))}
						</ColumnList>
					</AZListItem>
				))}
			</AZList>
		</>
	);
};
