import React, { FC } from "react";

import { Layout } from "@/components/Layout/Layout";

import styles from "./index.module.scss";

const IndexPage: FC = () => {
	return (
		<Layout>
			<h1 className={styles.test}>BNF</h1>
		</Layout>
	);
};

export default IndexPage;
