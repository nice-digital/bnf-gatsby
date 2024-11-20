import { useLocation } from "@reach/router";
import React, { type FC } from "react";

import { Alert } from "@nice-digital/nds-alert";

import styles from "./InteractionsAlert.module.scss";

interface InteractionsAlertProps {
	supplementaryInformation?: { title: string; information: string }[];
}

export const InteractionsAlert: FC<InteractionsAlertProps> = ({
	supplementaryInformation = [],
}) => {
	const location = useLocation();

	if (!location.pathname.startsWith("/interactions")) return null;

	return (
		<div className={styles.alertContainer}>
			<Alert type="caution" role="alert" data-testid="interactions-a-z-alert">
				<h2 className={styles.interactionsAlertHeading}>Important</h2>
				<p className={styles.interactionsAlertText}>
					For combination products such as co-amilofruse (amiloride+furosemide)
					and co-trimoxazole (trimethoprim+sulfamethoxazole), check for
					interactions with the individual drugs. You can find links in the
					interactions section of the monograph for the combination product.
				</p>
			</Alert>
			{supplementaryInformation.map((supInf) => (
				<Alert type="info" key={supInf.title}>
					<h2 className="h4">{supInf.title}</h2>
					<div
						className={styles.interactionsAlertText}
						dangerouslySetInnerHTML={{
							__html: supInf.information,
						}}
					></div>
				</Alert>
			))}
		</div>
	);
};
