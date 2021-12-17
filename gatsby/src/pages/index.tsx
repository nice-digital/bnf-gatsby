import { Link } from "gatsby";
import { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Hero } from "@nice-digital/nds-hero";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

const IndexPage: FC = () => {
	const { siteTitleShort, siteTitleLong, isBNF } = useSiteMetadata();

	return (
		<Layout>
			<SEO />
			<Hero
				id="content-start"
				title={`${siteTitleLong}`}
				intro={
					isBNF
						? "The British National Formulary (BNF) is the first choice for concise medicines information. Trusted by healthcare professionals across the world to support confident decision-making at the point of care."
						: "Covering neonates to adolescents, the BNF for Children includes key clinical and pharmaceutical information specific to those age groups."
				}
				header={
					<Breadcrumbs>
						<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
						<Breadcrumb>{siteTitleShort}</Breadcrumb>
					</Breadcrumbs>
				}
			/>

			<p>
				<Link to="/drugs/">Go to drugs</Link>
			</p>
		</Layout>
	);
};

export default IndexPage;
