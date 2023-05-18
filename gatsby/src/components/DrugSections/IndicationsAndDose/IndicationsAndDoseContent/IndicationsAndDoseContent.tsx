import classNames from "classnames";
import { Fragment, type FC, useMemo } from "react";

import { type FeedIndicationsAndDosePotContent } from "@nice-digital/gatsby-source-bnf";

import { Accordion } from "@/components/Accordion/Accordion";
import { type QueryResult, type WithSlug } from "@/utils";

import styles from "./IndicationsAndDoseContent.module.scss";

export interface IndicationsAndDoseContentProps {
	content: WithSlug<QueryResult<FeedIndicationsAndDosePotContent>>;
	/** The string to be rendered before the `contentFor` field.
	 *
	 * Defaults to `For`. Pass `For all` for drug classes to read `For all tetracyclines` for example. */
	contentForPrefix?: "For" | "For all";
	/** Whether to (`true`) or not (`false`) to wrap this indications and dose content in an accordion to make it collapsible */
	collapsible: boolean;
}

export const IndicationsAndDoseContent: FC<IndicationsAndDoseContentProps> = ({
	content: {
		contentFor,
		slug,
		indicationAndDoseGroups,
		doseEquivalence,
		doseAdjustments,
		extremesOfBodyWeight,
		pharmacokinetics,
		potency,
	},
	contentForPrefix = "For",
	collapsible,
}) => {
	const body = useMemo(
		() => (
			<>
				{indicationAndDoseGroups?.map(
					({ therapeuticIndications, routesAndPatientGroups }, groupIndex) => {
						const groupId = `${slug}-indication-${groupIndex + 1}`;

						return (
							<section
								key={groupIndex}
								className={styles.indicationWrapper}
								aria-labelledby={groupId}
							>
								<h4 id={groupId} className={styles.indicationHeading}>
									{therapeuticIndications.map(
										(
											{ indication, sctIndication, sctTherapeuticIntent },
											indicationIndex
										) => (
											<Fragment key={indication}>
												<span
													dangerouslySetInnerHTML={{
														__html:
															indication +
															(indicationIndex <
															therapeuticIndications.length - 1
																? ", "
																: ""),
													}}
													className={styles.indicationText}
													data-sct-indication={sctIndication}
													data-sct-therapeutic-intent={sctTherapeuticIntent}
												/>
											</Fragment>
										)
									)}
									<span
										className="visually-hidden"
										dangerouslySetInnerHTML={{ __html: ` for ${contentFor}` }}
									/>
								</h4>
								{routesAndPatientGroups.map(
									({ routeOfAdministration, patientGroups }, index) => (
										<section
											key={routeOfAdministration}
											className={styles.routeOfAdministration}
										>
											<h5
												className={styles.routeOfAdministrationHeading}
												dangerouslySetInnerHTML={{
													__html: routeOfAdministration,
												}}
											/>
											<dl className={styles.patientGroups}>
												{patientGroups.map(
													(
														{
															patientGroup,
															detailedPatientGroup,
															doseStatement,
														},
														index
													) => (
														<div
															key={`${patientGroup}_${index}`}
															className={classNames(
																styles.patientGroupDose,
																styles[patientGroup]
															)}
														>
															<dt
																className={styles.patientGroup}
																dangerouslySetInnerHTML={{
																	__html: detailedPatientGroup,
																}}
															/>
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
				)}
				{doseAdjustments && (
					<section aria-labelledby={`${slug}-dose-adjustments`}>
						<h4 id={`${slug}-dose-adjustments`}>
							Dose adjustments due to interactions
							<span
								className="visually-hidden"
								dangerouslySetInnerHTML={{ __html: ` for ${contentFor}` }}
							/>
						</h4>
						<div
							className={styles.supplementary}
							dangerouslySetInnerHTML={{ __html: doseAdjustments }}
						/>
					</section>
				)}
				{doseEquivalence && (
					<section aria-labelledby={`${slug}-dose-equivalence`}>
						<h4 id={`${slug}-dose-equivalence`}>
							Dose equivalence and conversion
							<span
								className="visually-hidden"
								dangerouslySetInnerHTML={{ __html: ` for ${contentFor}` }}
							/>
						</h4>
						<div
							className={styles.supplementary}
							dangerouslySetInnerHTML={{ __html: doseEquivalence }}
						/>
					</section>
				)}
				{extremesOfBodyWeight && (
					<section aria-labelledby={`${slug}-extremes-of-body-weight`}>
						<h4 id={`${slug}-extremes-of-body-weight`}>
							Doses at extremes of body-weight
							<span
								className="visually-hidden"
								dangerouslySetInnerHTML={{ __html: ` for ${contentFor}` }}
							/>
						</h4>
						<div
							className={styles.supplementary}
							dangerouslySetInnerHTML={{ __html: extremesOfBodyWeight }}
						/>
					</section>
				)}
				{potency && (
					<section aria-labelledby={`${slug}-potency`}>
						<h4 id={`${slug}-potency`}>
							Potency
							<span
								className="visually-hidden"
								dangerouslySetInnerHTML={{ __html: ` for ${contentFor}` }}
							/>
						</h4>
						<div
							className={styles.supplementary}
							dangerouslySetInnerHTML={{ __html: potency }}
						/>
					</section>
				)}
				{pharmacokinetics && (
					<section aria-labelledby={`${slug}-pharmacokinetics`}>
						<h4 id={`${slug}-pharmacokinetics`}>
							Pharmacokinetics
							<span
								className="visually-hidden"
								dangerouslySetInnerHTML={{ __html: ` for ${contentFor}` }}
							/>
						</h4>
						<div
							className={styles.supplementary}
							dangerouslySetInnerHTML={{ __html: pharmacokinetics }}
						/>
					</section>
				)}
			</>
		),
		[
			indicationAndDoseGroups,
			slug,
			contentFor,
			doseAdjustments,
			doseEquivalence,
			extremesOfBodyWeight,
			potency,
			pharmacokinetics,
		]
	);

	return (
		<section aria-labelledby={`${slug}-indications-and-dose`}>
			{collapsible ? (
				<Accordion
					title={
						<h3
							id={`${slug}-indications-and-dose`}
							dangerouslySetInnerHTML={{
								__html: `${contentForPrefix} ${contentFor}`,
							}}
						/>
					}
				>
					{body}
				</Accordion>
			) : (
				<>
					<h3
						id={`${slug}-indications-and-dose`}
						className="visually-hidden"
						dangerouslySetInnerHTML={{
							__html: `${contentForPrefix} ${contentFor}`,
						}}
					/>
					{body}
				</>
			)}
		</section>
	);
};
