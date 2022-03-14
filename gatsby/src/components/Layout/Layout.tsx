import React, { ReactNode } from "react";

import { Footer, Main } from "@nice-digital/global-nav";
import { Container } from "@nice-digital/nds-container";

import { SiteHeader } from "../SiteHeader/SiteHeader";

import { isBNF } from "./../../site";
import "./../../styles/global.scss";

type LayoutProps = {
	children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
	return (
		<>
			<SiteHeader />
			<Main>
				<Container>{children}</Container>
			</Main>
			<Footer service={isBNF ? "bnf" : "bnfc"} />
		</>
	);
};
