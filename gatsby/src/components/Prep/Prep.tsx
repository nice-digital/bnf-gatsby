import { FC } from "react";

import { FeedPrep } from "@nice-digital/gatsby-source-bnf";

export interface PrepProps {
	prep: FeedPrep;
}

export const Prep: FC<PrepProps> = ({ prep }) => (
	<>
		<h3>
			{prep.name} {prep.manufacturer} {prep.blackTriangle ? "\u25BC" : null}
		</h3>
		{prep.controlledDrugSchedule && <p>{prep.controlledDrugSchedule}</p>}
		{prep.activeIngredients && prep.activeIngredients?.length > 0 ? (
			<p
				dangerouslySetInnerHTML={{
					__html: prep.activeIngredients.join(", "),
				}}
			/>
		) : null}
		{prep.packs && prep.packs.length ? (
			<ol>
				{prep.packs.map((pack) => (
					<li key={pack.amppId}>
						<dl>
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
	</>
);
