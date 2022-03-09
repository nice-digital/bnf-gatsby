import slugify from "@sindresorhus/slugify";
import classNames from "classnames";
import { Fragment, type FC, useMemo } from "react";
import striptags from "striptags";

import { type FeedIndicationsAndDosePotContent } from "@nice-digital/gatsby-source-bnf";

import { Accordion } from "@/components/Accordion/Accordion";

import styles from "./IndicationsAndDoseContent.module.scss";

export interface IndicationsAndDoseContentProps {
	content: FeedIndicationsAndDosePotContent;
	/** The string to be rendered before the `contentFor` field.
	 *
	 * Defaults to `For`. Pass `For all` for drug classes to read `For all tetracyclines` for example. */
	contentForPrefix?: string;
	/** Whether to (`true`) or not (`false`) to wrap this indications and dose content in an accordion to make it collapsible */
	collapsible: boolean;
}

export const IndicationsAndDoseContent: FC<IndicationsAndDoseContentProps> = ({
	content: { contentFor, indicationAndDoseGroups },
	contentForPrefix = "For",
	collapsible,
}) => {
	const slug = slugify(striptags(contentFor));

	const body = useMemo(
		() =>
			indicationAndDoseGroups?.map(
				({ therapeuticIndications, routesAndPatientGroups }, groupIndex) => {
					const groupId = `${slug}-indication-${groupIndex + 1}`;

					return (
						<section
							key={groupIndex}
							className={styles.indicationWrapper}
							aria-labelledby={groupId}
						>
							<h4 id={groupId}>
								{therapeuticIndications.map(
									(
										{ indication, sctIndication, sctTherapeuticIntent },
										indicationIndex
									) => (
										<Fragment key={indication}>
											<span
												dangerouslySetInnerHTML={{ __html: indication }}
												className={styles.indication}
												data-sct-indication={sctIndication}
												data-sct-therapeutic-intent={sctTherapeuticIntent}
											/>
											{indicationIndex < therapeuticIndications.length - 1 ? (
												<span className={styles.indicationSeparator}> or </span>
											) : null}
										</Fragment>
									)
								)}
								<span className="visually-hidden"> for {contentFor}</span>
							</h4>
							{routesAndPatientGroups?.map(
								({ routeOfAdministration, patientGroups }) => (
									<section key={routeOfAdministration}>
										<h5 className={styles.routeOfAdministration}>
											{routeOfAdministration}
										</h5>
										<dl>
											{patientGroups.map(
												({
													patientGroup,
													detailedPatientGroup,
													doseStatement,
												}) => (
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
															dangerouslySetInnerHTML={{
																__html: doseStatement,
															}}
														/>
													</div>
												)
											)}
										</dl>
									</section>
								)
							)}
						</section>
					);
				}
			),
		[indicationAndDoseGroups, slug]
	);

	return (
		<section aria-labelledby={`${slug}-indications-and-dose`}>
			{collapsible ? (
				<Accordion
					title={
						<h3 id={`${slug}-indications-and-dose`}>
							{contentForPrefix} {contentFor}
						</h3>
					}
					defaultOpen={false}
				>
					{body}
				</Accordion>
			) : (
				<>
					<h3 id={`${slug}-indications-and-dose`} className="visually-hidden">
						{contentForPrefix} {contentFor}
					</h3>
					{body}
				</>
			)}
		</section>
	);
};
