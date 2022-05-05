import { FC } from "react";

import { FeedBorderlineSubstancePresentation } from "@nice-digital/gatsby-source-bnf";

import styles from "./../../{BnfBorderlineSubstancesTaxonomy.slug}.module.scss";
import Preparation from "./Preparation/Preparation";

export type PresentationProps = {
	presentation: FeedBorderlineSubstancePresentation;
};

const Presentation: FC<PresentationProps> = ({ presentation }) => {
	return (
		<>
			<dl>
				<div className={styles.packDefinitionListItem}>
					<dt>
						<strong>Formulation</strong>
					</dt>
					<dd>{presentation.formulation}</dd>
				</div>

				<div className={styles.packDefinitionListItem}>
					<dt>
						<strong>Energy (Kj)</strong>
					</dt>
					<dd>
						{presentation.energyKj}{" "}
						{presentation.energyKCal && `(${presentation.energyKCal})`}
					</dd>
				</div>

				<div className={styles.packDefinitionListItem}>
					<dt>
						<strong>Protein (g)</strong>
					</dt>
					<dd>
						{presentation.proteinGrams}
						{presentation.proteinConstituents &&
							`(${presentation.proteinConstituents})`}
					</dd>
				</div>

				<div className={styles.packDefinitionListItem}>
					<dt>
						<strong>Carbohydrate (g)</strong>
					</dt>
					<dd>
						{presentation.carbohydrateGrams}
						{presentation.carbohydrateConstituents &&
							`(${presentation.carbohydrateConstituents})`}
					</dd>
				</div>

				<div className={styles.packDefinitionListItem}>
					<dt>
						<strong>Fat (g)</strong>
					</dt>
					<dd>{presentation.fatGrams}</dd>
				</div>

				<div className={styles.packDefinitionListItem}>
					<dt>
						<strong>Fibre (g)</strong>
					</dt>
					<dd>{presentation.fibreGrams}</dd>
				</div>

				<div className={styles.packDefinitionListItem}>
					<dt>
						<strong>Special characteristics</strong>
					</dt>
					<dd>{presentation.specialCharacteristics}</dd>
				</div>

				<div className={styles.packDefinitionListItem}>
					<dt>
						<strong>Standard ACBS indications</strong>
					</dt>
					<dd>{presentation.acbs}</dd>
				</div>
			</dl>

			{presentation.borderlineSubstancePreps?.map((preparation, i) => (
				<Preparation key={i} preparation={preparation}></Preparation>
			))}
		</>
	);
};

export default Presentation;
