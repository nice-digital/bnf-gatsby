import { FC } from "react";
import striptags from "striptags";

export interface SectionLink {
	id: string;
	title: string;
}

export interface SectionNavProps {
	sections: (SectionLink | undefined)[];
}

const isNotUndefined = (link: SectionLink | undefined): link is SectionLink => {
	return !!link;
};

export const SectionNav: FC<SectionNavProps> = ({ sections }) => (
	<nav aria-labelledby="navigate-to-section">
		<h2 id="navigate-to-section">Navigate to section</h2>
		<ol aria-label="Jump links to sections on this page">
			{sections.filter(isNotUndefined).map((section) => (
				<li key={section.id}>
					<a href={`#${section.id}`}>{striptags(section.title)}</a>
				</li>
			))}
		</ol>
	</nav>
);
