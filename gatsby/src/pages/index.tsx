import { Link } from "gatsby";
import { FC } from "react";

import { Alphabet, Letter } from "@nice-digital/nds-alphabet";
import { Button } from "@nice-digital/nds-button";
import { Grid, GridItem } from "@nice-digital/nds-grid";

import { Hero } from "@/components/Hero/Hero";
import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import styles from "./index.module.scss";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const HomePage: FC = () => {
	const { isBNF } = useSiteMetadata();

	return (
		<Layout>
			<SEO />
			<Hero isBNF={isBNF} />
			<Grid gutter="loose">
				<GridItem md={6} cols={12} className={styles.drugsColumn}>
					<h2>Drugs A to Z</h2>
					<p>
						Drug monographs describe the uses, doses, safety issues, medicinal
						forms and other considerations involved in the use of a drug.
					</p>
					<h3 className="h4">Browse drugs</h3>
					<Alphabet
						chunky
						data-tracking="drugs-a-to-z"
						elementType={Link}
						className={styles.alphabet}
					>
						{alphabet.map((letter) => (
							<Letter key={`alphabet_${letter}`} to={`/drugs/#${letter}`}>
								{letter.toUpperCase()}
							</Letter>
						))}
					</Alphabet>
				</GridItem>

				<GridItem md={6} cols={12} className={styles.featureColumn}>
					<div>
						<h2 id="interactions">Treatment summaries</h2>

						<p>
							Browse an A-Z list of treatment summaries covering: - drug use
							related to a particular body system - drug management or treatment
							of common conditions - comparisons between groups of drugs.
						</p>
						<Button
							to="/treatment-summaries/"
							variant="primary"
							elementType={Link}
						>
							View treatment summaries A-Z
						</Button>
					</div>

					<div>
						<h2 id="interactions">Interactions</h2>

						<p>
							Check for drug interactions. Includes information on the severity
							of an interaction and the type of evidence to support it.
						</p>
						<Button to="/interactions/" variant="primary" elementType={Link}>
							View interactions A-Z
						</Button>
					</div>
				</GridItem>
			</Grid>

			<hr />

			<Grid gutter="loose">
				<GridItem md={6} cols={12}>
					<h2>
						<Link to="/medicines-guidance/">Medicines guidance</Link>
					</h2>

					<p>
						General guidance on prescribing and the use of medicines. Includes
						guidance on{" "}
						<Link to="/guidance/prescribing-in-palliative-care/">
							prescribing in palliative care
						</Link>
						,{" "}
						<Link to="/guidance/prescription-writing/">
							prescription writing
						</Link>{" "}
						and{" "}
						<Link to="/guidance/prescribing-in-renal-impairment/">
							prescribing in renal impairment
						</Link>
						.
					</p>
				</GridItem>

				<GridItem md={6} cols={12}>
					<h2>
						<Link to="/wound-management/">Wound management</Link>
					</h2>

					<p>
						Wound management products and elasticated garments. Browse by wound
						type or product type.
					</p>
				</GridItem>

				<GridItem md={6} cols={12}>
					<h2>
						<Link to="/medical-devices/">Medical devices</Link>
					</h2>

					<p>
						Indication, dose and medicinal product information for medical
						devices. Browse devices by type.
					</p>
				</GridItem>

				<GridItem md={6} cols={12}>
					<h2>
						<Link to="/borderline-substance-taxonomy/">
							Borderline substances
						</Link>
					</h2>

					<p>
						Foods and toilet preparations, that in certain conditions have the
						characteristics of drugs.
					</p>
				</GridItem>
			</Grid>
			<hr />
			<Grid gutter="loose">
				<GridItem md={6} cols={12}>
					<h2>
						<Link to="/nurse-prescribers-formulary/">
							Nurse prescribers formulary
						</Link>
					</h2>

					<p>
						Medicines approved by the NHS for Nurse Practitioner prescribing.
					</p>
				</GridItem>

				<GridItem md={6} cols={12}>
					<h2>
						<Link to="/dental-practitioners-formulary/">
							Dental practitioners formulary
						</Link>
					</h2>

					<p>Medicines approved by the NHS for dental prescribing. </p>
				</GridItem>
			</Grid>
			<hr />
			<Grid gutter="loose">
				<GridItem cols={12} sm={6} md={4}>
					<h2 className="h3">
						<Link to="/about/approximate-conversions-and-units/">
							Approximate conversions and units
						</Link>
					</h2>

					<p>
						Conversions and units tables. Includes growth chart with average
						weight and height, by gender and age (neonate, child and adult).
					</p>
				</GridItem>

				<GridItem cols={12} sm={6} md={4}>
					<h2 className="h3">
						<Link to="/about/labels/">Cautionary and advisory labels</Link>
					</h2>

					<p>
						Cautionary, warning and advisory labels applied to medications used
						in the BNF.
					</p>
				</GridItem>

				<GridItem cols={12} sm={6} md={4}>
					<h2 className="h3">
						<Link to="/about/abbreviations-and-symbols/">
							Abbreviations and symbols
						</Link>
					</h2>

					<p>
						Glossary of symbols and abbreviations. Includes Latin, medication
						and dosage abbreviations used in the BNF and prescribing.
					</p>
				</GridItem>
			</Grid>

			<hr />

			<ul
				className={styles.inlineList}
				data-tracking={`${isBNF ? "BNF" : "BNFC"} home footer`}
			>
				<li>
					<Link to="/about/changes/">What&apos;s changed?</Link>
				</li>
				<li>
					<Link to="/about/">About {isBNF ? "BNF" : "BNFC"}</Link>
				</li>
			</ul>
		</Layout>
	);
};

export default HomePage;
