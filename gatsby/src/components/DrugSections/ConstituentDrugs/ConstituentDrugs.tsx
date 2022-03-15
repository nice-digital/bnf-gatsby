import { Link } from "gatsby";
import { type FC } from "react";
import { type Except } from "type-fest";

import { type FeedConstituentDrugs } from "@nice-digital/gatsby-source-bnf";

interface ConstituentDrug {
	title: string;
	slug: string;
}

export type ConstituentDrugsProps = Except<
	FeedConstituentDrugs,
	"constituents"
> & {
	// A consituent can be null if it doesn't correspond to a monograph in its own right
	constituents: (ConstituentDrug | null)[];
};

const isTruthyConstituent = (
	drug: ConstituentDrug | null
): drug is ConstituentDrug => !!drug;

export const ConstituentDrugs: FC<ConstituentDrugsProps> = ({
	message,
	constituents,
}) => {
	return (
		<section aria-labelledby="constituent-drugs">
			<h2 id="constituent-drugs">Constituent drugs</h2>
			<p dangerouslySetInnerHTML={{ __html: message }} />
			<ul aria-labelledby="constituent-drugs">
				{constituents.filter(isTruthyConstituent).map(({ slug, title }) => (
					<li key={slug}>
						<Link to={`/drugs/${slug}/`}>{title}</Link>
					</li>
				))}
			</ul>
		</section>
	);
};
