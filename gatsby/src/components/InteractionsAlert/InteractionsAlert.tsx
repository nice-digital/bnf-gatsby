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
				<h2 className={styles.alertHeading}>Warning</h2>
				<p className={styles.alertText}>
					Combination products, for example co-amilofruse
					(amiloride+furosemide), do not appear in this list. You must check
					interactions with each constituent medicine.
				</p>
			</Alert>
			{supplementaryInformation.map((supInf) => (
				<Alert type="info" key={supInf.title}>
					<h2 className={styles.alertHeading}>{supInf.title}</h2>
					<div
						className={styles.alertText}
						dangerouslySetInnerHTML={{
							__html: supInf.information,
						}}
					></div>
				</Alert>
			))}
		</div>
	);
};
