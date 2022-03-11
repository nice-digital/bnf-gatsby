import { graphql, Link } from "gatsby";
import React, { FC, useState, useEffect, useCallback } from "react";
import striptags from "striptags";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

type Interaction = {
	interactant: {
		title: string;
		drug: {
			slug: string;
		};
	};
	messages: {
		additiveEffect: boolean;
		evidence: string | null;
		message: string;
		severity: string;
		severityOrder: number;
	}[];
};

export interface InteractantPageProps {
	data: {
		bnfInteractant: {
			title: string;
			drug: null | {
				title: string;
				slug: string;
			};
			interactions: Interaction[];
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

	const [sortBySeverity, setSortBySeverity] = useState<boolean>(false);

	const getSortedInteractions = useCallback(() => {
		return interactions.sort((a, b) => {
			if (sortBySeverity) {
				// First, sort by severity within each message (for drugs with
				// multiple interactions)
				interactions.forEach((i) => {
					i.messages.sort((a, b) => {
						return a.severityOrder < b.severityOrder ? 1 : -1;
					});
				});

				// Next, sort the whole list
				const aMaxSeverity = Math.max(
					...a.messages.map((m) => m.severityOrder)
				);
				const bMaxSeverity = Math.max(
					...b.messages.map((m) => m.severityOrder)
				);

				// Sort alphabetically within each type of severity
				if (aMaxSeverity === bMaxSeverity) {
					return a.interactant.title.localeCompare(b.interactant.title);
				} else {
					return aMaxSeverity < bMaxSeverity ? 1 : -1;
				}
			} else {
				return a.interactant.title.localeCompare(b.interactant.title);
			}
		});
	}, [interactions, sortBySeverity]);

	const [sortedInteractions, setSortedInteractions] = useState<Interaction[]>(
		getSortedInteractions()
	);

	// Sort interactants by name or severity
	useEffect(() => {
		setSortedInteractions(getSortedInteractions());
	}, [sortBySeverity, getSortedInteractions]);

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

			<aside>
				<div>
					<strong>Sorted by:</strong>
					{sortBySeverity ? (
						<>
							Severity |
							<button onClick={() => setSortBySeverity(false)}>
								Sort by: Name
							</button>
						</>
					) : (
						<>
							Name |
							<button onClick={() => setSortBySeverity(true)}>
								Sort by: Severity
							</button>
						</>
					)}
				</div>
			</aside>

			{sortedInteractions.length ? (
				<>
					<h2 className="visually-hidden" id="interactions-list-heading">
						List of interactions for {drug?.title}
					</h2>
					<ol aria-labelledby="interactions-list-heading">
						{interactions.map(({ interactant, messages }) => (
							<li key={interactant.title}>
								<h3>{interactant.title}</h3>
								<ul>
									{messages.map(
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
				</>
			) : null}
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
				interactant {
					title
					drug {
						slug
					}
				}
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
