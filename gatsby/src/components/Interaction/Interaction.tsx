import { Link } from "gatsby";
import React from "react";

import styles from "./Interaction.module.scss";

export type InteractionProps = {
	interactant: {
		title: string;
		drug: {
			slug: string;
		};
	};
	messages: {
		additiveEffect: boolean;
		evidence: string | null;
		message: string;
		severity: string;
		severityOrder: number;
	}[];
};

export const Interaction: React.FC<InteractionProps> = ({
	interactant,
	messages,
}: InteractionProps) => {
	const SEVERE_INTERACTION = 4;

	return (
		<>
			<h3 className={styles.interactantTitle}>
				{interactant.drug?.slug ? (
					<Link to={`/drugs/${interactant.drug.slug}/`}>
						{interactant.title}
					</Link>
				) : (
					interactant.title
				)}
			</h3>
			<ul className={styles.messageList}>
				{messages.map(({ message, severity, severityOrder }, messageIndex) => {
					return (
						<li key={messageIndex} className={styles.message}>
							<div
								className={
									severityOrder >= SEVERE_INTERACTION
										? styles.severeMessage
										: ""
								}
							>
								<div dangerouslySetInnerHTML={{ __html: message }}></div>
								{severityOrder >= SEVERE_INTERACTION && (
									<p>
										<strong>Severity: {severity}</strong>
									</p>
								)}
							</div>
						</li>
					);
				})}
			</ul>
		</>
	);
};
