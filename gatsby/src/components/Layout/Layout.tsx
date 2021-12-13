import React, { ReactNode } from "react";
import { Helmet } from "react-helmet";

import { Footer } from "@nice-digital/global-nav";
import { Container } from "@nice-digital/nds-container";

import { SiteHeader } from "../SiteHeader/SiteHeader";

import { isBNF } from "./../../site";
import "./../../styles/global.scss";

type LayoutProps = {
	children: ReactNode;
};

// A global CSS class allows us to distinguish BNF from BNFC is SCSS
const globalCSSClassName = isBNF ? "site-bnf" : "site-bnfc";

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
	return (
		<>
			<Helmet
				htmlAttributes={{ class: globalCSSClassName }}
				titleTemplate={`%s | ${isBNF ? `BNF` : "BNFC"} | NICE`}
				defaultTitle={
					isBNF
						? "BNF (British National Formulary) | NICE"
						: "BNFC (British National Formulary for Children) | NICE"
				}
			/>
			<SiteHeader />
			<main id="content-start">
				<Container>{children}</Container>
			</main>
			<Footer service={isBNF ? "bnf" : "bnfc"} />
		</>
	);
};
