import { useLocation } from "@reach/router";
import React, { type FC } from "react";

import { Alert } from "@nice-digital/nds-alert";

export const InteractionsAlert: FC = () => {
	const location = useLocation();

	if (!location.pathname.startsWith("/interactions")) return null;

	return (
		<Alert type="caution" role="alert" data-testid="interactions-a-z-alert">
			<h2>Important:</h2>
			<p>
				for combination products such as co-amilofruse (amiloride+furosemide)
				and co-trimoxazole (trimethoprim+sulfamethoxazole), check for
				interactions with the individual drugs. You can find links in the
				interactions section of the monograph for the combination product.
			</p>
		</Alert>
	);
};
