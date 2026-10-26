import { Link } from "gatsby";

import { Panel } from "@nice-digital/nds-panel";

import { isBNF } from "./../../site";
import styles from "./EULAPanel.module.scss";

export const EULAPanel: React.FC = () => {
	return (
		<div className={styles.panel}>
			<div className="container">
				<Panel>
					{isBNF ? (
						<p>
							BNF content is copyright &copy; BMJ Publishing Group Limited and
							Pharmaceutical Press, the Royal College of Pharmacy&apos;s
							knowledge business. By using BNF, you agree to the licence set out
							in the{" "}
							<Link to="/eula">
								BNF Publications End User Licence Agreement
							</Link>
							.
						</p>
					) : (
						<p>
							BNFC content is copyright &copy; BMJ Publishing Group Limited,
							Pharmaceutical Press, the Royal College of Pharmacy&apos;s
							knowledge business, and RCPCH Publications Limited. By using BNFC,
							you agree to the licence set out in the{" "}
							<Link to="/eula">
								BNF Publications End User Licence Agreement
							</Link>
							.
						</p>
					)}
				</Panel>
			</div>
		</div>
	);
};
