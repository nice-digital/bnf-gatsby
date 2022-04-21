import { Link } from "gatsby";
import { type FC } from "react";

import { type SlugAndTitle } from "@/utils";

export type InteractionsContentProps = {
	interactants: SlugAndTitle[];
};

export const InteractionsContent: FC<InteractionsContentProps> = ({
	interactants,
}) => {
	if (interactants.length === 1) {
		const { slug, title } = interactants[0];
		return (
			<p>
				<Link to={`/interactions/${slug}/`}>
					View interactions for{" "}
					<span dangerouslySetInnerHTML={{ __html: title }} />
				</Link>
			</p>
		);
	}

	return (
		<>
			<p>View interactions for:</p>
			<ul aria-label="Links to each interactant">
				{interactants.map(({ slug, title }) => (
					<li key={slug}>
						<Link
							to={`/interactions/${slug}/`}
							dangerouslySetInnerHTML={{ __html: title }}
						/>
					</li>
				))}
			</ul>
		</>
	);
};
