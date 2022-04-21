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
				{messages.map(
					({ message, severity, severityOrder, evidence }, messageIndex) => {
						const isSevereInteraction = severityOrder >= SEVERE_INTERACTION;
						return (
							<li key={messageIndex} className={styles.message}>
								<div
									className={isSevereInteraction ? styles.severeMessage : ""}
								>
									<div dangerouslySetInnerHTML={{ __html: message }}></div>
									<dl className={styles.supplementaryInfo}>
										<dt>Severity:</dt>
										<dd>{severity}</dd>
										{evidence !== null && (
											<>
												<dt>Evidence:</dt>
												<dd>{evidence}</dd>
											</>
										)}
									</dl>
								</div>
							</li>
						);
					}
				)}
			</ul>
		</>
	);
};
