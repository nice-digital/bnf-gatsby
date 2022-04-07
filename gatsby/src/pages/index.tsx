import { graphql, Link } from "gatsby";
import { FC, useMemo } from "react";

import { Alphabet, Letter } from "@nice-digital/nds-alphabet";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { Hero } from "@nice-digital/nds-hero";
import { Panel } from "@nice-digital/nds-panel";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import styles from "./index.module.scss";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

type IndexProps = {
	data: {
		bnfMetadata: {
			lastUpdatedDate: string;
			lastUpdatedDateFormatted: string;
			runTag: string;
		};
	};
};

const HomePage: FC<IndexProps> = ({
	data: {
		bnfMetadata: { lastUpdatedDate, lastUpdatedDateFormatted, runTag },
	},
}: IndexProps) => {
	const { siteTitleShort, siteTitleLong, isBNF } = useSiteMetadata();
	const linkableLetters = ["A", "B"];
	// const linkableLetters = useMemo(
	// 	() => [...drugNames].map((name) => name[0].toLowerCase()),
	// 	[drugNames]
	// );
	return (
		<Layout>
			<SEO />
			<div className={isBNF ? "bnf-layout" : "bnfc-layout"}>
				<time dateTime={lastUpdatedDate}>{lastUpdatedDateFormatted}</time>
				<Hero
					id="content-start"
					title={
						isBNF
							? "British National Formulary (BNF)"
							: "British National Formulary for Children (BNFC)"
					}
					intro="Key information on the selection, prescribing, dispensing and administration of medicines."
					header={
						<Breadcrumbs>
							<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
							<Breadcrumb>{siteTitleShort}</Breadcrumb>
						</Breadcrumbs>
					}
				/>

				<Grid gutter="none">
					<GridItem md={6} cols={12} className={styles.topicsColumn}>
						<h2 id="drugs-a-to-z">Drugs A to Z</h2>
						<p id="drugs-a-to-z-desc">
							Drug monographs describe the uses, doses, safety issues, medicinal
							forms and other considerations involved in the use of a drug.
						</p>

						{/* <Alphabet
							chunky
							aria-labelledby="drugs-a-to-z"
							aria-describedby="drugs-a-to-z-desc"
							data-tracking="drugs-a-to-z"
						>
							{alphabet.map((letter) => (
								<Letter
									key={`alphabet_${letter}`}
									to={linkableLetters.has(letter) && `/topics/#${letter}`}
								>
									{letter.toUpperCase()}
								</Letter>
							))}
						</Alphabet> */}

						<h3 id="frequently-visited-topics">ytyty&nbsp;etete</h3>
					</GridItem>

					<GridItem md={6} cols={12} className={styles.specialitiesColumn}>
						<h2 id="specialities">rtrtr</h2>

						<p>trtrtrtrtr&nbsp;trtrrtr.</p>
					</GridItem>
				</Grid>
			</div>

			{/* OLD PAGE BELOW*/}
			<Hero
				id="content-start-OLD"
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
			<p>
				<Link to="/medicines-guidance/">Medicines guidance</Link>
			</p>
		</Layout>
	);
};

export default HomePage;

export const query = graphql`
	{
		bnfMetadata {
			lastUpdatedDateFormatted: exportStarted(formatString: "D MMMM YYYY")
			lastUpdatedDate: exportStarted
			runTag
		}
	}
`;
