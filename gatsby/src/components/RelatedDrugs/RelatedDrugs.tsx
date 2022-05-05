import { type FC } from "react";

import { type SlugAndTitle } from "@/utils";

import { Tag, TagList } from "../TagList/TagList";

export interface RelatedDrugsProps {
	drugs: SlugAndTitle[];
}

export const RelatedDrugs: FC<RelatedDrugsProps> = ({ drugs }) => (
	<>
		{drugs.length > 0 ? (
			<section aria-labelledby="related-drugs">
				<h2 id="related-drugs">Related drugs</h2>
				<TagList aria-labelledby="related-drugs">
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
