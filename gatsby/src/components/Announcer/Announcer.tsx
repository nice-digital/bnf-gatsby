import { useEffect, type FC } from "react";

export interface AnnounceProps {
	announcement: string;
}

export const Announcer: FC<AnnounceProps> = ({ announcement }) => {
	useEffect(() => {
		// Use Gatsby's built in announcer div so we don't need to create our own
		const gatsbyRouteAnnouncer = document.getElementById("gatsby-announcer");
		if (gatsbyRouteAnnouncer) gatsbyRouteAnnouncer.textContent = announcement;
	}, [announcement]);

	return null;
};
