import { graphql, Link } from "gatsby";
import { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export interface InteractionsIntroductionPageProps {
	data: {
		bnfInteractionsIntroduction: {
			sections: { content: string }[];
		};
	};
}

const InteractionsIndexPage: FC<InteractionsIntroductionPageProps> = ({
	data,
}) => {
	const { siteTitleShort } = useSiteMetadata();

	return (
		<Layout>
			<SEO
				title="Introduction | Interactions"
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
				<Breadcrumb>Introduction</Breadcrumb>
			</Breadcrumbs>

			<PageHeader id="content-start" heading="Interactions: Introduction" />

			<div
				dangerouslySetInnerHTML={{
					__html: data.bnfInteractionsIntroduction.sections[0].content,
				}}
			></div>
		</Layout>
	);
};

export const query = graphql`
	{
		bnfInteractionsIntroduction {
			sections {
				content
			}
		}
	}
`;

export default InteractionsIndexPage;
