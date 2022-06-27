import React, { ReactNode } from "react";

import { Footer, Main } from "@nice-digital/global-nav";
import { Container } from "@nice-digital/nds-container";

import { useIsClient } from "@/hooks/useIsClient";

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
			<SiteHeader />
			<Main>
				<SiteDistinction />
				<Container>{children}</Container>
				<div id="sticky-nav-portal"></div>
			</Main>
			<Footer service={isBNF ? "bnf" : "bnfc"} />
		</>
	);
};
