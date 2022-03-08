import classNames from "classnames";
import { Fragment, type FC } from "react";

import { type FeedIndicationsAndDosePotContent } from "@nice-digital/gatsby-source-bnf";

import styles from "./IndicationsAndDoseContent.module.scss";

export interface IndicationsAndDoseContentProps {
	content: FeedIndicationsAndDosePotContent;
}

export const IndicationsAndDoseContent: FC<IndicationsAndDoseContentProps> = ({
	content: { contentFor, indicationAndDoseGroups },
}) => (
	<section>
		<h3>
			For <span className={styles.contentFor}>{contentFor}</span>
		</h3>
		{indicationAndDoseGroups?.map(
			({ therapeuticIndications, routesAndPatientGroups }, i) => (
				<section key={i} className={styles.indicationWrapper}>
					<h4>
						{therapeuticIndications.map(
							({ indication, sctIndication, sctTherapeuticIntent }, i) => (
								<Fragment key={indication}>
									<span
										dangerouslySetInnerHTML={{ __html: indication }}
										className={styles.indication}
										data-sct-indication={sctIndication}
										data-sct-therapeutic-intent={sctTherapeuticIntent}
									/>
									{i < therapeuticIndications.length - 1 ? (
										<span className={styles.indicationSeparator}> or </span>
									) : null}
								</Fragment>
							)
						)}
					</h4>
					{routesAndPatientGroups?.map(
						({ routeOfAdministration, patientGroups }) => (
							<section key={routeOfAdministration}>
								<h5 className={styles.routeOfAdministration}>
									{routeOfAdministration}
								</h5>
								<dl>
									{patientGroups.map(
										({ patientGroup, detailedPatientGroup, doseStatement }) => (
											<div
												key={patientGroup}
												className={classNames(
													styles.patientGroupDose,
													styles[patientGroup]
												)}
											>
												<dt className={styles.patientGroup}>
													{detailedPatientGroup}
												</dt>
												<dd
													className={styles.doseStatement}
													dangerouslySetInnerHTML={{ __html: doseStatement }}
												/>
											</div>
										)
									)}
								</dl>
							</section>
						)
					)}
				</section>
			)
		)}
	</section>
);
