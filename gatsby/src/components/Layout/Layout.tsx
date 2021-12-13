import React, { ReactNode } from "react";

import { Footer } from "@nice-digital/global-nav";
import { Container } from "@nice-digital/nds-container";

import { SiteHeader } from "../SiteHeader/SiteHeader";

import "./../../styles/global.scss";

type LayoutProps = {
	children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
	return (
		<>
			<SiteHeader />
			<main id="content-start">
				<Container>{children}</Container>
			</main>
			<Footer service="bnf" />
		</>
	);
};
