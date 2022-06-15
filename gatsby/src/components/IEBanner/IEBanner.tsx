import * as React from "react";

import { Alert } from "@nice-digital/nds-alert";

import { isBNF } from "./../../site";
import styles from "./IEBanner.module.scss";

export const IEBanner: React.FC = () => {
	const currentDate = new Date();
	const retirementDate = new Date("2022-06-15T00:00:00.000Z");
	const tense = currentDate >= retirementDate ? "was" : "will be";

	return (
		<div className={styles.banner}>
			<div className="container">
				<Alert type="caution" className={styles.banner}>
					<h2>Browser support</h2>
					<p>
						Your browser, Internet Explorer 11 (IE11), {tense} retired by
						Microsoft on June 15th, 2022.
					</p>
					<p>
						The NICE {isBNF ? "BNF" : "BNFC"} does not support IE11; we strongly
						recommend that you use an alternative browser such as{" "}
						<a href="https://www.microsoft.com/en-us/edge">Edge</a>,{" "}
						<a href="https://www.google.com/chrome/">Chrome</a> or{" "}
						<a href="https://www.mozilla.org/en-GB/firefox/new/">Firefox</a>{" "}
						instead. If you are using Edge, please ensure that you do not have
						IE mode enabled for this site.
					</p>
					<p>
						For more information, please see{" "}
						<a href="https://techcommunity.microsoft.com/t5/windows-it-pro-blog/internet-explorer-11-desktop-app-retirement-faq/ba-p/2366549">
							Microsoft&apos;s IE11 retirement FAQ
						</a>
					</p>
				</Alert>
			</div>
		</div>
	);
};
