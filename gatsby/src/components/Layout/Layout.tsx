import React, { ReactNode } from "react";
import { Helmet } from "react-helmet";

import { Footer, Main } from "@nice-digital/global-nav";
import { Container } from "@nice-digital/nds-container";

import { IEBanner } from "../IEBanner/IEBanner";
import { SiteDistinction } from "../SiteDistinction/SiteDistinction";
import { SiteHeader } from "../SiteHeader/SiteHeader";

import { isBNF } from "./../../site";
import "./../../styles/feed.scss";
import "./../../styles/global.scss";

type LayoutProps = {
	children: ReactNode;
	isIE?: boolean;
};

declare global {
	interface Document {
		documentMode?: unknown;
	}
}

export const Layout: React.FC<LayoutProps> = ({
	children,
	isIE,
}: LayoutProps) => {
	return (
		<>
			{isIE && <IEBanner />}
			<SiteHeader />
			<Main>
				<SiteDistinction />
				<Container>{children}</Container>
			</Main>
			<Footer service={isBNF ? "bnf" : "bnfc"} />
		</>
	);
};
