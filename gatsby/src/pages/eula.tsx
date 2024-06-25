import { Link } from "gatsby";
import React from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { EULAContent } from "@/components/EULABanner/EULABanner";

import { SEO } from "../components/SEO/SEO";

import { isBNF } from "./../site";

const EULAPage: React.FC = () => {
	return (
		<>
			<SEO title="NICE BNF End User Licence Agreement" />
			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{isBNF ? "BNF" : "BNFC"}
				</Breadcrumb>
				<Breadcrumb>NICE BNF End User Licence Agreement</Breadcrumb>
			</Breadcrumbs>
			<PageHeader heading="NICE BNF End User Licence Agreement" />
			<EULAContent />
		</>
	);
};

export default EULAPage;
