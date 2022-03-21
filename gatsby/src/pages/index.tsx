import { Link } from "gatsby";
import { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { Hero } from "@nice-digital/nds-hero";
import { Panel } from "@nice-digital/nds-panel";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

const HomePage: FC = () => {
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
				actions={
					<Button to="/drugs/" variant="cta" elementType={Link}>
						Browse drugs
					</Button>
				}
			/>

			<Grid gutter="loose">
				<GridItem cols={12} sm={6} md={4}>
					<Panel variant="impact-alt">
						<h2 className="h3">Drugs A&nbsp;to&nbsp;Z</h2>
						<p>Browse the list of drug monographs, arranged alphabetically.</p>
						<Button to="/drugs/" variant="cta" elementType={Link}>
							Browse drugs
						</Button>
					</Panel>
				</GridItem>
				<GridItem cols={12} sm={6} md={4}>
					<Panel variant="primary">
						<h2 className="h3">Interactions</h2>
						<p>
							Browse the list of drug interactions, arranged alphabetically.
						</p>
						<Button to="/interactions/" variant="inverse" elementType={Link}>
							Browse interactions
						</Button>
					</Panel>
				</GridItem>
				<GridItem cols={12} sm={6} md={4}>
					<Panel variant="impact-alt">
						<h2 className="h3">Treatment summaries</h2>
						<p>
							Browse the list of treatment summaries, arranged alphabetically.
						</p>
						<Button
							to="/treatment-summaries/"
							variant="secondary"
							elementType={Link}
						>
							Browse treatment summaries
						</Button>
					</Panel>
				</GridItem>
			</Grid>

			<p>
				<Link to="/about/">About</Link>
			</p>
			<p>
				<Link to="/dental-practitioners-formulary/">
					Dental Practitioners&apos; Formulary
				</Link>
			</p>
			<p>
				<Link to="/medical-devices/">Medical devices</Link>
			</p>
			<p>
				<Link to="/wound-management/">
					Wound management products and elasticated garments
				</Link>
			</p>
			<p>
				<Link to="/nurse-prescribers-formulary/">
					Nurse Prescribers&apos; Formulary
				</Link>
			</p>
		</Layout>
	);
};

export default HomePage;
