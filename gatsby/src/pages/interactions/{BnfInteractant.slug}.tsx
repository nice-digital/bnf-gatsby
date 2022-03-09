import { graphql, Link } from "gatsby";
import React, { FC } from "react";
import striptags from "striptags";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export interface InteractantPageProps {
	data: {
		bnfInteractant: {
			title: string;
			drug: null | {
				title: string;
				slug: string;
			};
			interactions: {
				interactant2: string;
				messages: {
					additiveEffect: boolean;
					evidence: string | null;
					message: string;
					severity: string;
					severityOrder: number;
				}[];
			}[];
		};
	};
}

const InteractantPage: FC<InteractantPageProps> = ({
	data: {
		bnfInteractant: { title, drug, interactions },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata(),
		titleNoHtml = striptags(title);

	return (
		<Layout>
			<SEO
				title={`${titleNoHtml} | Interactions`}
				description={`A list of drugs that interact with ${titleNoHtml}`}
			/>

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb to="/interactions/" elementType={Link}>
					Interactions
				</Breadcrumb>
				<Breadcrumb>{titleNoHtml}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				preheading={<span dangerouslySetInnerHTML={{ __html: title + " " }} />}
				heading="Interactions"
				lead={
					drug ? (
						<Link to={`/drugs/${drug.slug}/`}>
							View {drug.title} monograph page
						</Link>
					) : null
				}
			/>

			<p>{title} has the following interaction information</p>

			{interactions && (
				<ol>
					{interactions.map((interaction) => (
						<li key={interaction.interactant2}>
							<h2>{interaction.interactant2}</h2>
							<ul>
								{interaction.messages.map(
									(
										{
											evidence,
											message,
											additiveEffect,
											severity,
											severityOrder,
										},
										messageIndex
									) => (
										<li key={messageIndex}>
											<p dangerouslySetInnerHTML={{ __html: message }}></p>
											<p>Additive effect: {additiveEffect.toString()}</p>
											<p>Severity: {severity}</p>
											<p>Severity order: {severityOrder}</p>
											<p>Evidence: {evidence || "N/A"}</p>
										</li>
									)
								)}
							</ul>
						</li>
					))}
				</ol>
			)}
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfInteractant(id: { eq: $id }) {
			title
			drug {
				title
				slug
			}
			interactions {
				interactant2
				messages {
					additiveEffect
					evidence
					message
					severity
					severityOrder
				}
			}
		}
	}
`;

export default InteractantPage;
