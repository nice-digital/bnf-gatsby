import { graphql, Link } from "gatsby";
import React, { FC } from "react";
import striptags from "striptags";
import { type Except } from "type-fest";

import { type FeedDrug } from "@nice-digital/gatsby-source-bnf";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { SimplePot } from "@/components/SimplePot/SimplePot";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export interface DrugPageProps {
	data: {
		bnfDrug: Except<FeedDrug, "constituentDrugs"> & {
			slug: string;
			interactant: null | {
				title: string;
				slug: string;
			};
			constituentDrugs: null | {
				message: string;
				// TODO This will be non-null when the feed only surfaces existing monograph ids for constituent drugs
				constituents: (null | {
					title: string;
					slug: string;
				})[];
			};
			allergyAndCrossSensitivity: { slug: string };
			pregnancy: { slug: string };
		};
	};
}

const DrugPage: FC<DrugPageProps> = ({
	data: {
		bnfDrug: {
			title,
			slug,
			interactant,
			constituentDrugs,
			allergyAndCrossSensitivity,
			pregnancy,
		},
	},
}) => {
	const { siteTitleShort } = useSiteMetadata(),
		titleNoHtml = striptags(title);

	return (
		<Layout>
			<SEO
				title={`${titleNoHtml} | Drugs`}
				description={`Indications, dose, contra-indications, side-effects, interactions, cautions, warnings and other safety information for ${titleNoHtml}`}
			/>

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb to="/drugs/" elementType={Link}>
					Drugs
				</Breadcrumb>
				<Breadcrumb>{titleNoHtml}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={<span dangerouslySetInnerHTML={{ __html: title }} />}
			/>

			{interactant && (
				<p>
					<Link to={`/interactions/${interactant.slug}/`}>
						View interactions page for {interactant.title}
					</Link>
				</p>
			)}

			{constituentDrugs && (
				<section aria-labelledby="constituent-drugs">
					<h2 id="constituent-drugs">Constituent drugs</h2>
					<p dangerouslySetInnerHTML={{ __html: constituentDrugs.message }} />
					<ul aria-labelledby="constituent-drugs">
						{constituentDrugs.constituents.map((constituent) =>
							constituent ? (
								<li key={constituent.slug}>
									<Link to={`/drugs/${constituent.slug}/`}>
										{constituent.title}
									</Link>
								</li>
							) : null
						)}
					</ul>
				</section>
			)}

			{allergyAndCrossSensitivity && (
				<SimplePot data={allergyAndCrossSensitivity} />
			)}

			{pregnancy && <SimplePot data={pregnancy} />}

			<p>
				<Link to={`/drugs/${slug}/medicinal-forms/`}>Medicinal forms</Link>
			</p>
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfDrug(id: { eq: $id }) {
			title
			slug
			interactant {
				title
				slug
			}
			constituentDrugs {
				message
				constituents {
					title
					slug
				}
			}
			allergyAndCrossSensitivity {
				...SimplePot
			}
			breastFeeding {
				...SimplePot
			}
			conceptionAndContraception {
				...SimplePot
			}
			contraIndications {
				...SimplePot
			}
			directionsForAdministration {
				...SimplePot
			}
			drugAction {
				...SimplePot
			}
			effectOnLaboratoryTests {
				...SimplePot
			}
			exceptionsToLegalCategory {
				...SimplePot
			}
			handlingAndStorage {
				...SimplePot
			}
			hepaticImpairment {
				...SimplePot
			}
			importantSafetyInformation {
				...SimplePot
			}
			lessSuitableForPrescribing {
				...SimplePot
			}
			palliativeCare {
				...SimplePot
			}
			patientAndCarerAdvice {
				...SimplePot
			}
			preTreatmentScreening {
				...SimplePot
			}
			pregnancy {
				...SimplePot
			}
			prescribingAndDispensingInformation {
				...SimplePot
			}
			professionSpecificInformation {
				...SimplePot
			}
			renalImpairment {
				...SimplePot
			}
			sideEffects {
				...SimplePot
			}
			treatmentCessation {
				...SimplePot
			}
			unlicensedUse {
				...SimplePot
			}
		}
	}
`;

export default DrugPage;
