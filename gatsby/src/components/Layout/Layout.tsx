import React, { ReactNode } from "react";

import { Footer, Main } from "@nice-digital/global-nav";
import { Container } from "@nice-digital/nds-container";

import { useIsClient } from "@/hooks/useIsClient";

import { EULABanner } from "../EULABanner/EULABanner";
import { EULAPanel } from "../EULAPanel/EULAPanel";
import { IEBanner } from "../IEBanner/IEBanner";
import { SiteDistinction } from "../SiteDistinction/SiteDistinction";
import { SiteHeader } from "../SiteHeader/SiteHeader";

import { isBNF } from "./../../site";
import "./../../styles/feed.scss";
import "./../../styles/global.scss";

type LayoutProps = {
	children: ReactNode;
};

declare global {
	interface Document {
		documentMode?: unknown;
	}
}

const shouldShowEULABanner =
	process.env.GATSBY_HIDE_EULA_BANNER === "true" ? false : true;

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
	const isClient = useIsClient();
	let isIE = false;
	if (isClient) {
		const doc: Document = window.document;
		isIE = !!doc.documentMode;
	}

	return (
		<>
			{isIE && <IEBanner />}
			{shouldShowEULABanner && <EULABanner />}
			<SiteHeader />
			<Main>
				<SiteDistinction />
				<Container>{children}</Container>
				<EULAPanel />
				<div id="sticky-nav-portal"></div>
			</Main>
			<Footer service={isBNF ? "bnf" : "bnfc"} />
		</>
	);
};
