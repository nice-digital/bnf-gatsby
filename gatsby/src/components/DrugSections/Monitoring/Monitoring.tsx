import { type FC } from "react";

import { type FeedMonitoringPot } from "@nice-digital/gatsby-source-bnf";

import { type PotWithSlug } from "src/types";

export type MonitoringProps = PotWithSlug & FeedMonitoringPot;

export const Monitoring: FC<MonitoringProps> = ({
	potName,
	slug,
	drugClassContent,
	drugContent,
	prepContent,
}) => {
	return (
		<section aria-labelledby={slug}>
			<h2 id={slug} dangerouslySetInnerHTML={{ __html: potName }} />
			<p>TODO: Monitoring</p>
		</section>
	);
};
