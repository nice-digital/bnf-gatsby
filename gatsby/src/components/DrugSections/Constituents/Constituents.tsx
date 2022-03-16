import { Link } from "gatsby";
import { type FC } from "react";

import { useIsTruthy } from "@/hooks/useIsTruthy";

import { type SlugAndTitle, type PotWithSlug } from "src/types";

import styles from "../DrugSection.module.scss";

export type ConstituentsProps = PotWithSlug & {
	message: string;
	constituents: SlugAndTitle[];
};

export const Constituents: FC<ConstituentsProps> = ({
	message,
	constituents,
	potName,
	slug,
}) => {
	const isTruthy = useIsTruthy();

	return (
		<section aria-labelledby={slug} className={styles.section}>
			<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />
			<p dangerouslySetInnerHTML={{ __html: message }} />
			<ul aria-labelledby={slug}>
				{constituents.filter(isTruthy).map(({ slug, title }) => (
					<li key={slug}>
						<Link
							to={`/drugs/${slug}/`}
							dangerouslySetInnerHTML={{ __html: title }}
						/>
					</li>
				))}
			</ul>
		</section>
	);
};
