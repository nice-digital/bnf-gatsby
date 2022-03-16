import { graphql, Link } from "gatsby";
import React, { FC, useState, useEffect, useCallback, useRef } from "react";
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
import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useIsClient } from "@/hooks/useIsClient";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import interactionStyles from "../../components/Interaction/Interaction.module.scss";

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

const InteractantPage: FC<InteractantPageProps> = ({
	data: {
		bnfInteractant: { title, drug, interactions },
	},
}) => {
	const isClient = useIsClient();
	const { siteTitleShort } = useSiteMetadata(),
		titleNoHtml = striptags(title);

	// Handle sorting of interactions
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

	const [interactionsList, setInteractionsList] = useState<InteractionProps[]>(
		getSortedInteractions()
	);

	useEffect(() => {
		setInteractionsList(getSortedInteractions());
	}, [sortBySeverity, getSortedInteractions]);

	// Handle filtering of interactions
	const filterInput = useRef<HTMLFormElement>(null);
	const [filterTerm, setFilterTerm] = useState("");

	const clearFilter = () => {
		setFilterTerm("");
		setInteractionsList(getSortedInteractions());
		if (filterInput?.current?.drugNameInput) {
			console.log("Clearing:", filterInput.current);
			filterInput.current.drugNameInput.value = "";
		}
	};

	const handleFilter = () => {
		const input = filterInput?.current?.drugNameInput.value.trim();
		if (input) {
			setFilterTerm(input);
			filterInteractions(input);
		} else {
			clearFilter();
		}
	};

	const filterInteractions = (input: string) => {
		const filteredInteractions = interactions.filter((interaction) =>
			interaction.interactant.title.toLowerCase().includes(input.toLowerCase())
		);
		setInteractionsList(filteredInteractions);
	};

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
							View <span dangerouslySetInnerHTML={{ __html: title }} />
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
							Severe interactions are highlighted with a red marker
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
							<div className="input-test">
								<form ref={filterInput}>
									<Input
										label="Filter by drug name"
										placeholder="Enter drug name"
										name="drugNameInput"
									/>
									<Button
										onClick={() => handleFilter()}
										variant={Button.variants.secondary}
									>
										Filter
									</Button>
								</form>
							</div>
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

					{filterTerm !== "" && (
						<div className={styles.clearFilterWrapper}>
							<button
								onClick={clearFilter}
								type="button"
								className={styles.clearFilterButton}
							>
								{filterTerm} <RemoveIcon />
								<span className="visually-hidden">
									Remove {filterTerm} filter
								</span>
							</button>
						</div>
					)}

					<div className={styles.resultCount}>
						Showing {interactionsList.length} of {interactions.length}
					</div>

					{interactionsList.length ? (
						<>
							<h2 className="visually-hidden" id="interactions-list-heading">
								List of interactions for{" "}
								<span dangerouslySetInnerHTML={{ __html: title }} />
							</h2>
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
						</>
					) : null}
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
