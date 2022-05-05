import { type FC } from "react";

import { type SlugAndTitle } from "@/utils";

import { Tag, TagList } from "../TagList/TagList";

export interface RelatedDrugsProps {
	drugs: SlugAndTitle[];
}

export const sectionId = "related-drugs";

export const sectionHeading = "Related drugs";

export const RelatedDrugs: FC<RelatedDrugsProps> = ({ drugs }) => (
	<>
		{drugs.length > 0 ? (
			<section aria-labelledby={sectionId}>
				<h2 id={sectionId}>{sectionHeading}</h2>
				<TagList aria-labelledby={sectionId}>
					{drugs
						.sort((a, b) => a.slug.localeCompare(b.slug))
						.map((drug) => (
							<Tag key={drug.slug} href={`/drugs/${drug.slug}/`}>
								{drug.title}
							</Tag>
						))}
				</TagList>
			</section>
		) : null}
	</>
);
