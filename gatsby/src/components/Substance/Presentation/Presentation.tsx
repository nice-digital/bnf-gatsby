import { FC } from "react";

import { FeedBorderlineSubstancePresentation } from "@nice-digital/gatsby-source-bnf";

import { Prep } from "@/components/Prep/Prep";
import { type QueryResult } from "@/utils";

import styles from "./Presentation.module.scss";

export type PresentationProps = {
	presentation: QueryResult<FeedBorderlineSubstancePresentation>;
};

const Presentation: FC<PresentationProps> = ({ presentation }) => {
	return (
		<>
			<dl>
				{presentation?.formulation && (
					<div className={styles.packDefinitionListItem}>
						<dt>
							<strong>Formulation</strong>
						</dt>
						<dd>{presentation.formulation}</dd>
					</div>
				)}

				{presentation?.energyKj && (
					<div className={styles.packDefinitionListItem}>
						<dt>
							<strong>Energy (Kj)</strong>
						</dt>
						<dd>
							{presentation.energyKj}{" "}
							{presentation.energyKCal && `(${presentation.energyKCal})`}
						</dd>
					</div>
				)}

				{presentation?.proteinGrams && (
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
				)}

				{presentation?.carbohydrateGrams && (
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
				)}

				{presentation?.fatGrams && (
					<div className={styles.packDefinitionListItem}>
						<dt>
							<strong>Fat (g)</strong>
						</dt>
						<dd>{presentation.fatGrams}</dd>
					</div>
				)}

				{presentation?.fibreGrams && (
					<div className={styles.packDefinitionListItem}>
						<dt>
							<strong>Fibre (g)</strong>
						</dt>
						<dd>{presentation.fibreGrams}</dd>
					</div>
				)}

				{presentation?.specialCharacteristics && (
					<div className={styles.packDefinitionListItem}>
						<dt>
							<strong>Special characteristics</strong>
						</dt>
						<dd>{presentation.specialCharacteristics}</dd>
					</div>
				)}

				{presentation?.acbs && (
					<div className={styles.packDefinitionListItem}>
						<dt>
							<strong>Standard ACBS indications</strong>
						</dt>
						<dd>{presentation.acbs}</dd>
					</div>
				)}
			</dl>

			{presentation?.borderlineSubstancePreps?.map((preparation) => (
				<Prep key={preparation.ampId} prep={preparation}></Prep>
			))}
		</>
	);
};

export default Presentation;
