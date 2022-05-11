import { FC } from "react";

import { FeedBorderlineSubstancePresentation } from "@nice-digital/gatsby-source-bnf";

import { Prep } from "@/components/Prep/Prep";
import { type QueryResult } from "@/utils";

import styles from "./Presentation.module.scss";

const nilValue = "Nil";

const GramValue = (props: {
	label: string;
	valueInGrams: string;
	constituents: string[];
}) => (
	<div className={styles.packDefinitionListItem}>
		<dt>{props.label}</dt>
		<dd>
			{props.valueInGrams === nilValue ? (
				props.valueInGrams
			) : (
				<>
					{props.valueInGrams}&nbsp;g{" "}
					{props.constituents.length > 0 ? props.constituents.join(", ") : null}
				</>
			)}
		</dd>
	</div>
);

export type PresentationProps = {
	presentation: QueryResult<FeedBorderlineSubstancePresentation>;
};

const Presentation: FC<PresentationProps> = ({
	presentation: {
		acbs,
		carbohydrateConstituents,
		carbohydrateGrams,
		energyKCal,
		energyKj,
		fatConstituents,
		fatGrams,
		fibreConstituents,
		fibreGrams,
		formulation,
		proteinConstituents,
		proteinGrams,
		specialCharacteristics,
		borderlineSubstancePreps,
		presentationNote,
	},
}) => {
	return (
		<>
			<dl>
				{formulation && (
					<div className={styles.packDefinitionListItem}>
						<dt>Formulation</dt>
						<dd>{formulation}</dd>
					</div>
				)}

				{energyKj || energyKCal ? (
					<div className={styles.packDefinitionListItem}>
						<dt>Energy</dt>
						<dd>
							{energyKj && <>{energyKj}&nbsp;kJ</>}
							{energyKj && energyKCal ? " / " : null}
							{energyKCal && <>{energyKCal}&nbsp;kcal</>}
						</dd>
					</div>
				) : null}

				{proteinGrams && (
					<GramValue
						label="Protein"
						valueInGrams={proteinGrams}
						constituents={proteinConstituents}
					/>
				)}

				{carbohydrateGrams && (
					<GramValue
						label="Carbohydrate"
						valueInGrams={carbohydrateGrams}
						constituents={carbohydrateConstituents}
					/>
				)}

				{fatGrams && (
					<GramValue
						label="Fat"
						valueInGrams={fatGrams}
						constituents={fatConstituents}
					/>
				)}

				{fibreGrams && (
					<GramValue
						label="Fibre"
						valueInGrams={fibreGrams}
						constituents={fibreConstituents}
					/>
				)}

				{specialCharacteristics.length > 0 ? (
					<div className={styles.packDefinitionListItem}>
						<dt>Special characteristics</dt>
						<dd>{specialCharacteristics.join(", ")}</dd>
					</div>
				) : null}

				{acbs.length > 0 ? (
					<div className={styles.packDefinitionListItem}>
						<dt>ACBS indications</dt>
						<dd dangerouslySetInnerHTML={{ __html: acbs.join("") }} />
					</div>
				) : null}
			</dl>

			{presentationNote && <p>{presentationNote}</p>}

			{borderlineSubstancePreps.map((preparation) => (
				<Prep key={preparation.ampId} prep={preparation}></Prep>
			))}
		</>
	);
};

export default Presentation;
