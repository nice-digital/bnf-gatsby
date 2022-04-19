import { graphql, Link } from "gatsby";
import React, { FC, useState, useEffect } from "react";
import striptags from "striptags";

import RemoveIcon from "@nice-digital/icons/lib/Remove";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
import { Input } from "@nice-digital/nds-input";
import { PageHeader } from "@nice-digital/nds-page-header";

import {
	Interaction,
	InteractionProps,
} from "@/components/Interaction/Interaction";
import interactionStyles from "@/components/Interaction/Interaction.module.scss";
import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useIsClient } from "@/hooks/useIsClient";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import styles from "./{BnfInteractant.slug}.module.scss";

export interface InteractantPageProps {
	data: {
		bnfInteractant: {
			title: string;
			drug: null | {
				title: string;
				slug: string;
			};
			interactions: InteractionProps[];
		};
	};
}

const sortInteractions = (
	interactions: InteractionProps[],
	sortBySeverity: boolean,
	searchFilterTerm: string
) => {
	return interactions
		.filter((interaction) => {
			if (!searchFilterTerm) {
				return true;
			} else {
				return interaction.interactant.title
					.toLowerCase()
					.includes(searchFilterTerm.toLowerCase());
			}
		})
		.sort((a, b) => {
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
};

const InteractantPage: FC<InteractantPageProps> = ({
	data: {
		bnfInteractant: { title, drug, interactions },
	},
}) => {
	const isClient = useIsClient();
	const { siteTitleShort } = useSiteMetadata(),
		titleNoHtml = striptags(title);

	const [sortBySeverity, setSortBySeverity] = useState<boolean>(false);
	const [filterTerm, setFilterTerm] = useState<string>(""); // Stores current value of input
	const [searchFilterTerm, setSearchFilterTerm] = useState<string>(""); // Stores value of input used when search is triggered
	const [interactionsList, setInteractionsList] = useState<InteractionProps[]>(
		() => sortInteractions(interactions, sortBySeverity, searchFilterTerm)
	);

	const clearFilters = () => {
		setFilterTerm("");
		setSearchFilterTerm("");
	};

	useEffect(() => {
		setInteractionsList(
			sortInteractions(interactions, sortBySeverity, searchFilterTerm)
		);
	}, [interactions, sortBySeverity, searchFilterTerm]);

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			setSearchFilterTerm(filterTerm);
		}
	};

	const RemoveFilterButton: FC = () => (
		<div className={styles.clearFilterWrapper}>
			<button
				onClick={clearFilters}
				type="button"
				className={styles.clearFilterButton}
			>
				{searchFilterTerm} <RemoveIcon />
				<span className="visually-hidden">
					Remove {searchFilterTerm} filter
				</span>
			</button>
		</div>
	);

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
						<Link className="p" to={`/drugs/${drug.slug}/`}>
							View <span dangerouslySetInnerHTML={{ __html: drug.title }} />{" "}
							monograph page
						</Link>
					) : null
				}
			/>

			<p className={styles.interactionInformation}>
				<span dangerouslySetInnerHTML={{ __html: title }} /> has the following
				interaction information:
			</p>

			<div className={styles.grid}>
				<div className={styles.rightCol}>
					<div className={styles.informationPanel}>
						<h2 className={styles.informationPanelHeading}>
							Drug interaction information
						</h2>
						<p className={interactionStyles.severeMessage}>
							Severe interactions are highlighted with a red marker.
						</p>
						<p>
							<Link to="/interactions/introduction/">
								Find out more about BNF interactions information
							</Link>
						</p>
					</div>
				</div>
				<div className={styles.leftCol}>
					{isClient && (
						<section className={`${styles.filterPanel} hide-print`}>
							<h2 className="visually-hidden">Filters and sorting</h2>
							<form className={styles.filterForm}>
								<Input
									className={styles.filterInput}
									label="Filter by drug name"
									placeholder="Enter drug name"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setFilterTerm(e.target.value)
									}
									onKeyDown={handleKeyDown}
									name="drugNameInput"
									value={filterTerm}
								/>
								<Button
									onClick={() => setSearchFilterTerm(filterTerm)}
									variant={Button.variants.secondary}
									className={styles.filterButton}
								>
									Filter
								</Button>
							</form>
							<div className={styles.sortControls}>
								<strong>Sorted by: </strong>
								{sortBySeverity ? (
									<>
										<span className={styles.sortButtonLabel}>Severity | </span>
										<button
											className={styles.sortButton}
											onClick={() => setSortBySeverity(false)}
										>
											Sort by: Name
										</button>
									</>
								) : (
									<>
										<span className={styles.sortButtonLabel}>Name | </span>
										<button
											className={styles.sortButton}
											onClick={() => setSortBySeverity(true)}
										>
											Sort by: Severity
										</button>
									</>
								)}
							</div>
						</section>
					)}

					{interactionsList.length ? (
						<section aria-live="polite">
							<h2 className="visually-hidden" id="interactions-list-heading">
								List of interactions for{" "}
								<span dangerouslySetInnerHTML={{ __html: drug?.title || "" }} />
							</h2>
							<div className={styles.resultCount}>
								{interactionsList.length}{" "}
								{interactionsList.length === 1
									? "interaction "
									: "interactions "}{" "}
								{searchFilterTerm != "" && (
									<>
										for:
										<RemoveFilterButton />
									</>
								)}
							</div>
							<ol
								className={styles.interactionsList}
								aria-labelledby="interactions-list-heading"
							>
								{interactionsList.map(({ interactant, messages }) => (
									<li
										className={styles.interactionsListItem}
										key={interactant.title}
									>
										<Interaction
											interactant={interactant}
											messages={messages}
										/>
									</li>
								))}
							</ol>
						</section>
					) : (
						<>
							<div className={styles.resultCount}>
								No interactions found for: <RemoveFilterButton />
							</div>
							<p>
								We couldn&apos;t find any results that matched your filter. Try{" "}
								<button
									type="button"
									className={styles.linkButton}
									onClick={clearFilters}
								>
									clearing your filters
								</button>{" "}
								and starting again.
							</p>
						</>
					)}
				</div>
			</div>
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
