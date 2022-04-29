import { type FC } from "react";

import { type FeedPrep } from "@nice-digital/gatsby-source-bnf";

import { type QueryResult } from "@/utils";

import { AccordionGroup } from "../AccordionGroup/AccordionGroup";
import { Prep } from "../Prep/Prep";

import styles from "./MedicalDevicePrepsSection.module.scss";

export interface MedicalDevicePrepsSectionProps {
	preps: QueryResult<FeedPrep>[];
}

export const MedicalDevicePrepsSection: FC<MedicalDevicePrepsSectionProps> = ({
	preps,
}) => {
	const body = (
		<ol className={styles.prepList}>
			{preps
				.sort((a, b) => a.name.localeCompare(b.name))
				.map((prep) => (
					<li key={prep.name}>
						<Prep prep={prep} />
					</li>
				))}
		</ol>
	);

	return (
		<section aria-labelledby="medical-device-types">
			<h2 id="medical-device-types">Medical device types</h2>

			{preps.length === 1 ? (
				body
			) : (
				<AccordionGroup
					toggleText={(isOpen) =>
						`${isOpen ? "Hide" : "Show"} all medical device types (${
							preps.length
						})`
					}
				>
					{body}
				</AccordionGroup>
			)}
		</section>
	);
};
