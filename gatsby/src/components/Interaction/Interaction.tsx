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
	return (
		<>
			{interactant.drug?.slug ? (
				<h3 className={styles.interactantTitle}>
					<Link to={`/drugs/${interactant.drug.slug}`}>
						{interactant.title}
					</Link>
				</h3>
			) : (
				<h3 className={styles.interactantTitle}>{interactant.title}</h3>
			)}
			<ul className={styles.messageList}>
				{messages.map(({ message, severity, severityOrder }, messageIndex) => {
					const severeClass = severityOrder >= 4 ? styles.severeMessage : "";

					return (
						<li
							key={messageIndex}
							className={`${styles.message} ${severeClass}`}
						>
							<p dangerouslySetInnerHTML={{ __html: message }}></p>
							{severityOrder >= 4 && (
								<p>
									<strong>Severity: {severity}</strong>
								</p>
							)}
						</li>
					);
				})}
			</ul>
		</>
	);
};
