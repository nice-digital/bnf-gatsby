import { Panel } from "@nice-digital/nds-panel";
import { Link } from "gatsby";
import { isBNF } from "./../../site";
import styles from "./EULAPanel.module.scss";

export const EULAPanel: React.FC = () => {
	return (
		<div className={styles.panel}>
			<div className="container">
				<Panel>
					{isBNF ? (
						<p>
							The content on the NICE BNF site (BNF) is the copyright of BMJ
							Publishing Group Ltd and the Royal Pharmaceutical Society of Great
							Britain. By using BNF, you agree to the licence set out in the{" "}
							<Link to="/eula">
								BNF Publications End User Licence Agreement
							</Link>
							.
						</p>
					) : (
						<p>
							The content on the NICE BNFC site (BNFC) is the copyright of BMJ
							Publishing Group Ltd, the Royal Pharmaceutical Society of Great
							Britain, and RCPCH Publications Ltd. By using BNFC, you agree to
							the licence set out in the{" "}
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
