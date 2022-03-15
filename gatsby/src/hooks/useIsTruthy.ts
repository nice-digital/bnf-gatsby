import { useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useIsTruthy = () =>
	useCallback(
		<TMaybe>(maybeT: TMaybe | null): maybeT is TMaybe => !!maybeT,
		[]
	);
