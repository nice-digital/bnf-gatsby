import { Link } from "gatsby";
import { type FC } from "react";

import { useIsTruthy } from "@/hooks/useIsTruthy";

import { type ConstituentsWithSlugs, type PotWithSlug } from "src/types";

export type ConstituentsProps = PotWithSlug & ConstituentsWithSlugs;

export const Constituents: FC<ConstituentsProps> = ({
	message,
	constituents,
	potName,
	slug,
}) => {
	const isTruthy = useIsTruthy();

	return (
		<section aria-labelledby={slug}>
			<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />
			<p dangerouslySetInnerHTML={{ __html: message }} />
			<ul aria-labelledby={slug}>
				{constituents.filter(isTruthy).map(({ slug, title }) => (
					<li key={slug}>
						<Link to={`/drugs/${slug}/`}>{title}</Link>
					</li>
				))}
			</ul>
		</section>
	);
};
