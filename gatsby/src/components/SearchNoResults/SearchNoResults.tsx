import { Link } from "gatsby";
import { type FC } from "react";

import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export interface SearchNoResultsProps {
	searchText: string;
}

export const SearchNoResults: FC<SearchNoResultsProps> = ({ searchText }) => {
	const { isBNF } = useSiteMetadata();

	return (
		<>
			<section aria-labelledby="browse-for-content">
				<h3 id="browse-for-content">Browse for content</h3>
				<p>Try browsing for content with our:</p>
				<ul aria-label="Ways to browse for content">
					<li>
						<Link to={"/drugs/"}>Drugs A to Z list</Link>
					</li>
					<li>
						<Link to={"/treatment-summaries/"}>
							Treatment summaries A to Z list
						</Link>
					</li>
					<li>
						<Link to={"/interactions/"}>Interactions A to Z list</Link>
					</li>
				</ul>
			</section>
			<section aria-labelledby="try-other-services">
				<h3 id="try-other-services">Check our other services</h3>
				<p>
					See if there are search results for <b>{searchText}</b> on our other
					services:
				</p>
				<ul aria-label={`Search for "${searchText}" on our other services`}>
					<li>
						<a
							rel="noreferrer"
							target="_blank"
							href={`https://bnf${
								isBNF ? "c" : ""
							}.nice.org.uk/search/?q=${searchText}&sp=on`}
						>
							{isBNF ? "BNFC" : "BNF"}
						</a>
					</li>
					<li>
						<a
							rel="noreferrer"
							target="_blank"
							href={`https://www.nice.org.uk/search?om=[{%22ndt%22:[%22Guidance%22]}]&ps=15&q=${searchText}&sp=on`}
						>
							NICE guidance
						</a>
					</li>
					<li>
						<a
							rel="noreferrer"
							target="_blank"
							href={`https://cks.nice.org.uk/search/?q=${searchText}&sp=on`}
						>
							CKS
						</a>
					</li>
				</ul>
				<section aria-labelledby="what-are-other-services">
					<h4 id="what-are-other-services">What are our other services?</h4>
					<h5>
						{isBNF
							? "British National Formulary for Children (BNFC)"
							: "British National Formulary (BNF)"}
					</h5>
					<p>
						Drug and prescribing information for healthcare professionals. A
						reference for correct dosage, indication, interaction and side
						effects of drugs.
					</p>
					<h5>NICE guidance</h5>
					<p>
						We use the best available evidence to develop recommendations that
						guide decisions in health, public health and social care.
					</p>
					<h5>Clinical Knowledge Summaries (CKS)</h5>
					<p>
						Concise, accessible summaries of current evidence for primary care
						professionals. Information is presented as patient scenarios or
						clinical presentations with answers and links to supporting
						evidence.
					</p>
				</section>
			</section>
		</>
	);
};
