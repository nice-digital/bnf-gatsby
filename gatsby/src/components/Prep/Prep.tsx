import { type FC } from "react";

import { type FeedPrep } from "@nice-digital/gatsby-source-bnf";

import { Accordion } from "@/components/Accordion/Accordion";
import { type QueryResult } from "@/utils";

import styles from "./Prep.module.scss";

export const resolveSchedule = (schedule: string): string => {
	switch (schedule) {
		case "Schedule 1 (CD Lic)":
		case "Schedule 1 (CD)":
			return "CD1";
		case "Schedule 2 (CD Exempt Safe Custody)":
		case "Schedule 3 (CD No Register)":
			return "CD2";
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
			return "";
	}
};

export interface PrepProps {
	prep: QueryResult<FeedPrep>;
}

export const Prep: FC<PrepProps> = ({ prep, children }) => (
	<Accordion
		title={
			<h3 className={styles.prepHeading}>
				<span className={styles.headingIcons}>
					{prep.controlledDrugSchedule ? (
						<span className={styles.controlledScheduleCode}>
							{resolveSchedule(prep.controlledDrugSchedule)}
						</span>
					) : null}
					{prep.blackTriangle ? "\u25BC" : null}
					{prep.sugarFree ? (
						<span className={styles.sugarFree}>Sugar free </span>
					) : null}
				</span>
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
				{prep.packs.map((pack) => (
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
										{pack.legalCategory && (
											<>
												{" "}
												<span className={styles.legalCategory}>
													{pack.legalCategory}
												</span>
											</>
										)}
									</dd>
								</div>
							)}
							{pack.nhsIndicativePrice && (
								<div className={styles.packDefinitionListItem}>
									<dt>NHS indicative price</dt>
									<dd>
										{pack.nhsIndicativePrice}{" "}
										{pack.hospitalOnly && "(Hospital only)"}
									</dd>
								</div>
							)}
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
									<dd>{pack.legalCategory}</dd>
								</div>
							)}
						</dl>
					</li>
				))}
			</ol>
		) : null}
	</Accordion>
);
