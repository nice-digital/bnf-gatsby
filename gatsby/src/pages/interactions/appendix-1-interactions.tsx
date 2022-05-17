import { graphql, Link } from "gatsby";
import { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export interface InteractionsIntroductionPageProps {
	data: {
		bnfInteractionsIntroduction: {
			title: string;
			sections: { id: string; content: string; title: string }[];
		};
	};
}

const InteractionsIndexPage: FC<InteractionsIntroductionPageProps> = ({
	data: {
		bnfInteractionsIntroduction: { title, sections },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata();

	return (
		<>
			<SEO
				title="Appendix 1 Interactions | Interactions"
				description="Read about how pharmacodynamic and pharmacokinetic interactions can occur, potential effects of these interactions, and how their severity is graded in the BNF."
			/>

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb to="/interactions/" elementType={Link}>
					Interactions
				</Breadcrumb>
				<Breadcrumb>Appendix 1 Interactions</Breadcrumb>
			</Breadcrumbs>

			<PageHeader id="content-start" heading={title} />

			{sections.map(({ id, content, title }) => (
				<section key={id}>
					<h2>{title}</h2>
					<div dangerouslySetInnerHTML={{ __html: content }}></div>
				</section>
			))}
		</>
	);
};

export const query = graphql`
	{
		bnfInteractionsIntroduction {
			title
			sections {
				id
				content
				title
			}
		}
	}
`;

export default InteractionsIndexPage;
