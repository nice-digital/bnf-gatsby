import { FC } from "react";

import { FeedPrep } from "@nice-digital/gatsby-source-bnf";

import styles from "./../../../{BnfBorderlineSubstancesTaxonomy.slug}.module.scss";

export type PreparationProps = {
	preparation: FeedPrep;
};

const Preparation: FC<PreparationProps> = ({ preparation }) => {
	return (
		<>
			<section className={styles.preparation}>
				<h3 className={styles.prepHeading}>
					<span className={styles.headingText}>
						{preparation.name}{" "}
						<span className={styles.manufacturer}>
							{preparation.manufacturer}
						</span>
					</span>
				</h3>

				<hr></hr>
				{preparation.packs?.map((pack) => (
					<>
						<dl>
							<div className={styles.packDefinitionListItem}>
								<dt>
									<strong>Size</strong>
								</dt>
								<dd>{pack.size}</dd>
							</div>
							<div className={styles.packDefinitionListItem}>
								<dt>
									<strong>Unit</strong>
								</dt>
								<dd>{pack.unit}</dd>
							</div>
							<div className={styles.packDefinitionListItem}>
								<dt>
									<strong>NHS indicative price</strong>
								</dt>
								<dd>{pack.nhsIndicativePrice}</dd>
							</div>
						</dl>
					</>
				))}
			</section>
		</>
	);
};

export default Preparation;
