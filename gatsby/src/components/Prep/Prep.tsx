import { type FC } from "react";

import {
	type FeedPrep,
	type FeedControlledDrugSchedule,
	type FeedLegalCategory,
} from "@nice-digital/gatsby-source-bnf";

import { Accordion } from "@/components/Accordion/Accordion";
import { type QueryResult } from "@/utils";

import styles from "./Prep.module.scss";

export const resolveSchedule = (
	schedule: FeedControlledDrugSchedule
): string => {
	switch (schedule) {
		case "Schedule 1 (CD Lic)":
		case "Schedule 1 (CD)":
			return "CD1";
		case "Schedule 2 (CD)":
		case "Schedule 2 (CD Exempt Safe Custody)":
			return "CD2";
		case "Schedule 3 (CD No Register)":
		case "Schedule 3 (CD No Register Exempt Safe Custody)":
		case "Schedule 3 (CD No Register Phenobarbital)":
		case "Schedule 3 (CD No Register Temazepam)":
			return "CD3";
		case "Schedule 4 (CD Anab)":
			return "CD4-2";
		case "Schedule 4 (CD Benz)":
			return "CD4-1";
		case "Schedule 5 (CD Inv)":
			return "CD5";
		default:
			throw Error(`Could not find mapping for schedule ${schedule}`);
	}
};

export const resolveLegalCategory = (
	legalCategory: FeedLegalCategory
): string | null => {
	switch (legalCategory) {
		case "GSL":
			return "General sales list";
		case "P":
			return "Pharmacy only medicine";
		case "POM":
			return "Prescription-only medicine";
		case "Not Applicable":
			return null;
		default:
			throw Error(`Could not find mapping for legal category ${legalCategory}`);
	}
};

export interface PrepProps {
	prep: QueryResult<FeedPrep>;
	children?: React.ReactNode;
}

export const Prep: FC<PrepProps> = ({ prep, children }) => (
	<Accordion
		title={
			<h3 className={styles.prepHeading}>
				{prep.controlledDrugSchedule || prep.blackTriangle || prep.sugarFree ? (
					<span className={styles.headingIcons}>
						{prep.controlledDrugSchedule ? (
							<abbr
								className={styles.controlledScheduleCode}
								title={prep.controlledDrugSchedule}
							>
								{resolveSchedule(prep.controlledDrugSchedule)}{" "}
								<span className="visually-hidden">
									({prep.controlledDrugSchedule})
								</span>
							</abbr>
						) : null}
						{prep.blackTriangle ? (
							<span title="Black triangle">
								&#9660;
								<span className="visually-hidden"> (black triangle) </span>
							</span>
						) : null}
						{prep.sugarFree ? (
							<span className={styles.sugarFree}> Sugar free </span>
						) : null}
					</span>
				) : null}
				<span className={styles.headingText}>
					{prep.name}{" "}
					<span className={styles.manufacturer}>{prep.manufacturer}</span>
				</span>
			</h3>
		}
	>
		{children}
		{prep.controlledDrugSchedule && <p>{prep.controlledDrugSchedule}</p>}
		{prep.activeIngredients && prep.activeIngredients?.length > 0 ? (
			<dl>
				<div className={styles.packDefinitionListItem}>
					<dt>Active ingredients</dt>
					<dd>
						<div
							dangerouslySetInnerHTML={{
								__html: prep.activeIngredients.join(", "),
							}}
						/>
					</dd>
				</div>
			</dl>
		) : null}
		{prep.packs?.length ? (
			<ol className={styles.packList}>
				{prep.packs.map((pack) => {
					const legalCategoryFullText = pack.legalCategory
						? resolveLegalCategory(pack.legalCategory)
						: null;

					return (
						<li className={styles.packItem} key={pack.amppId}>
							<dl>
								{pack.size && (
									<div className={styles.packDefinitionListItem}>
										<dt>Size</dt>
										<dd>{pack.size}</dd>
									</div>
								)}
								{pack.unit && (
									<div className={styles.packDefinitionListItem}>
										<dt>Unit</dt>
										<dd>
											{pack.unit}
											{pack.acbs && (
												<>
													{" "}
													<abbr title="Advisory Committee on Borderline Substances">
														(ACBS)
													</abbr>
												</>
											)}
										</dd>
									</div>
								)}
								<div className={styles.packDefinitionListItem}>
									<dt>NHS indicative price</dt>
									<dd>
										{pack.nhsIndicativePrice
											? pack.nhsIndicativePrice
											: "No NHS indicative price available"}
										{pack.hospitalOnly && " (Hospital only)"}
									</dd>
								</div>
								{pack.drugTariff && (
									<div className={styles.packDefinitionListItem}>
										<dt>Drug tariff</dt>
										<dd>{pack.drugTariff}</dd>
									</div>
								)}
								{pack.drugTariffPrice && (
									<div className={styles.packDefinitionListItem}>
										<dt>Drug tariff price</dt>
										<dd>{pack.drugTariffPrice}</dd>
									</div>
								)}
								{pack.legalCategory && (
									<div className={styles.packDefinitionListItem}>
										<dt>Legal category</dt>
										<dd>
											{legalCategoryFullText ? (
												<>
													<span
														className={styles.legalCategory}
														title={legalCategoryFullText}
													>
														{pack.legalCategory}
													</span>
													&ensp;({legalCategoryFullText})
												</>
											) : (
												pack.legalCategory
											)}
										</dd>
									</div>
								)}
							</dl>
						</li>
					);
				})}
			</ol>
		) : null}
	</Accordion>
);
