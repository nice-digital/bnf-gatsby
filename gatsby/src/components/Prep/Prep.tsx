import { type FC } from "react";

import { type FeedPrep } from "@nice-digital/gatsby-source-bnf";

import { Accordion } from "@/components/Accordion/Accordion";

import styles from "./Prep.module.scss";
import { type QueryResult } from "@/utils";

export interface PrepProps {
	prep: QueryResult<FeedPrep>;
}

export const Prep: FC<PrepProps> = ({ prep }) => (
	<Accordion
		title={
			<h3 className={styles.prepHeading}>
				<span className={styles.headingIcons}>
					{prep.blackTriangle ? "\u25BC" : null}
				</span>
				<span className={styles.headingText}>
					{prep.name}{" "}
					<span className={styles.manufacturer}>{prep.manufacturer}</span>{" "}
				</span>
			</h3>
		}
	>
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
						<dl className={styles.packDefinitionList}>
							{pack.size && (
								<>
									<dt>Size</dt>
									<dd>{pack.size}</dd>
								</>
							)}
							{pack.unit && (
								<>
									<dt>Unit</dt>
									<dd>{pack.unit}</dd>
								</>
							)}
							{pack.nhsIndicativePrice && (
								<>
									<dt>NHS indicative price</dt>
									<dd>{pack.nhsIndicativePrice}</dd>
								</>
							)}
							{pack.drugTariff && (
								<>
									<dt>Drug tariff</dt>
									<dd>{pack.drugTariff}</dd>
								</>
							)}
							{pack.drugTariffPrice && (
								<>
									<dt>Drug tariff price</dt>
									<dd>{pack.drugTariffPrice}</dd>
								</>
							)}
							{pack.legalCategory && (
								<>
									<dt>Legal category</dt>
									<dd>{pack.legalCategory}</dd>
								</>
							)}
						</dl>
					</li>
				))}
			</ol>
		) : null}
	</Accordion>
);
