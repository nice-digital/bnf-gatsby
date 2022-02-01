import React, { ReactNode } from "react";

import { Footer } from "@nice-digital/global-nav";
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
			<main>
				<Container>{children}</Container>
			</main>
			<Footer service={isBNF ? "bnf" : "bnfc"} />
		</>
	);
};
