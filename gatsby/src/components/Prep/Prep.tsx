import { type FC } from "react";

import { type FeedPrep } from "@nice-digital/gatsby-source-bnf";

import { Accordion } from "@/components/Accordion/Accordion";
import { type QueryResult } from "@/utils";

import styles from "./Prep.module.scss";

export interface PrepProps {
	prep: QueryResult<FeedPrep>;
}

export const Prep: FC<PrepProps> = ({ prep, children }) => (
	<Accordion
		title={
			<h3 className={styles.prepHeading}>
				<span className={styles.headingIcons}>
					{prep.blackTriangle ? "\u25BC" : null}
					{prep.sugarFree ? (
						<span className={styles.sugarFree}>SUGAR FREE </span>
					) : null}
				</span>
				<span className={styles.headingText}>
					{prep.name}{" "}
					<span className={styles.manufacturer}>{prep.manufacturer}</span>{" "}
				</span>
			</h3>
		}
	>
		{children}
		{prep.controlledDrugSchedule && <p>{prep.controlledDrugSchedule}</p>}
		{prep.activeIngredients && prep.activeIngredients?.length > 0 ? (
			<p
				dangerouslySetInnerHTML={{
					__html: prep.activeIngredients.join(", "),
				}}
			/>
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
									<dd>{pack.unit}</dd>
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
