import { graphql, PageProps } from "gatsby";
import React, { useMemo, type FC } from "react";

import { AboutSectionMenu } from "@/components/AboutSectionMenu/AboutSectionMenu";
import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { RecordSectionsContent } from "@/components/RecordSectionsContent/RecordSectionsContent";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import { type RecordSection } from "src/types";

export type AboutSectionPageProps = {
	data: {
		currentAboutPage: {
			title: string;
			sections: RecordSection[];
		};
	};
	path: string;
};

const AboutSectionPage: FC<AboutSectionPageProps> = ({
	data: {
		currentAboutPage: { title, sections },
	},
	path,
}) => {
	const { siteTitleShort, siteTitleLong, isBNF } = useSiteMetadata();

	const metaDescriptions = useMemo(() => {
		const metas = new Map<string, string>();

		metas.set(
			"/about/changes/",
			`Keep up to date with the latest significant changes in the ${siteTitleShort} that are relevant to your clinical practice. Updated monthly.`
		);
		metas.set(
			"/about/publication-information/",
			`Look up publication details, including how to contact the ${siteTitleShort}'s publishers and how to order a printed copy of the ${siteTitleShort} in book format.`
		);
		metas.set(
			"/about/preface/",
			`The ${siteTitleLong} is a rapid reference resource for the latest information and advice on prescribing and pharmacology.`
		);
		metas.set(
			"/about/acknowledgements/",
			isBNF
				? "The Joint Formulary Committee is grateful to individuals and organisations that have provided advice and information to the BNF."
				: "The Paediatric Formulary Committee is grateful to individuals and organisations that have provided advice and information to the BNF for Children."
		);
		metas.set(
			"/about/bnf-staff/",
			`View the content director, editorial staff and support staff responsible for producing the ${siteTitleShort}.`
		);
		metas.set(
			"/about/joint-formulary-committee/",
			`The Joint Formulary Committee (JFC) is responsible for the content of the ${siteTitleShort}. The JFC includes pharmacy, medical, nursing, and lay representatives.`
		);
		metas.set(
			"/about/dental-advisory-group/",
			`The Dental Advisory Group oversees preparation of advice on the drug management of dental and oral conditions.`
		);
		metas.set(
			"/about/nurse-prescribers-advisory-group/",
			`The Nurse Prescribers' Advisory Group oversees the list of drugs approved for inclusion in the Nurse Prescribers' Formulary.`
		);
		metas.set(
			"/about/how-bnf-publications-are-constructed/",
			`Read more about the editorial and production processes behind the construction of the ${siteTitleShort} and the assessment of evidence used to make recommendations.`
		);
		metas.set(
			"/about/how-to-use-bnf-publications-online/",
			`View the how-to guide for using the online version of the ${siteTitleShort}, as found in appendix 1 of the printed edition.`
		);
		metas.set(
			"/about/frequently-asked-questions-for-the-bnf-and-bnf-for-children-bnfc-general/",
			`Get answers to frequently asked questions about the British National Formulary, including how to cite, or reference, the different versions of the BNF and BNFc.`
		);
		metas.set(
			"/about/frequently-asked-questions-clinical/",
			`View the answers to commonly asked questions that may come up when using the ${siteTitleShort} information and guidance on prescribing.`
		);
		metas.set(
			"/about/approximate-conversions-and-units/",
			`Conversions and units tables including growth chart with average weight and height, by gender and age (neonate, child and adult).`
		);
		metas.set(
			"/about/abbreviations-and-symbols/",
			`Glossary of symbols and abbreviations, including Latin, medication and dosage abbreviations used in the ${siteTitleShort} and prescribing.`
		);
		metas.set(
			"/about/medicines-information-services/",
			`Find contact details for both regional and national medicines information and advice lines/services in the UK.`
		);

		return metas;
	}, [siteTitleShort, siteTitleLong, isBNF]);

	const metaDesc = metaDescriptions.get(path);

	// Throwing an error here means we break the build if a new about page gets
	// added to the feed but that's a) infrequent and b) what we want so we can
	// craft a new meta description.
	if (!metaDesc)
		throw new Error(
			`Couldn't find meta description for page with path ${path}`
		);

	return (
		<DetailsPageLayout
			titleHtml={title}
			parentTitleParts={["About"]}
			parentBreadcrumbs={[{ href: "/about/", text: "About" }]}
			menu={AboutSectionMenu}
			sections={sections.map(({ slug, title }) => ({
				id: slug,
				title,
			}))}
			metaDescription={metaDesc}
		>
			<RecordSectionsContent sections={sections} />
		</DetailsPageLayout>
	);
};

export const query = graphql`
	query ($id: String) {
		currentAboutPage: bnfAboutSection(id: { eq: $id }) {
			title
			sections {
				...RecordSection
			}
		}
	}
`;

export default AboutSectionPage;
