import { Link } from "gatsby";
import React from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { SEO } from "../components/SEO/SEO";

import { isBNF } from "./../site";

import styles from "./eula.module.scss";

const NotFoundPage: React.FC = () => {
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

			<p>
				Please read these terms carefully because although the NICE BNF is
				freely accessible in the UK on this site it is only available for use,
				free of charge, by specific users in the circumstances set out in these
				terms. If you have any questions about this EULA you can contact{" "}
				<a href="mailto:licensing@rpharms.com.">licensing@rpharms.com</a>.
			</p>

			<div className={styles.terms}>
				<ol>
					<li>
						<span className={styles.section}>
							This contract and the NICE BNF
						</span>
						<ol>
							<li>
								By using the NICE BNF, you agree to enter into the contract with
								us on the terms set out below.
							</li>
							<li>
								If you are using the NICE BNF on behalf of your
								employer/company/organisation, you must have permission to enter
								into this contract on behalf of that organisation. Otherwise,
								you will be entering into this contract in your personal
								capacity.
							</li>
						</ol>
					</li>
					<li>
						<span className={styles.section}>
							Who can use the NICE BNF and for what purpose
						</span>
						<ol>
							<li>
								You agree that you are only allowed to Use the NICE BNF if you:
								<ol>
									<li>
										Are a member of the public acting in a private capacity
										(e.g. individual patient); in which case:
										<ol>
											<li>
												You are allowed to Use the NICE BNF for{" "}
												<strong>personal reference purposes only</strong> and
												not on behalf of or for the benefit of any company,
												organisation, educational institution, or business.
											</li>
											<li>
												You agree not to Use the NICE BNF for self-diagnosis or
												treatment and you agree not to rely on the NICE BNF as a
												substitute for a consultation with a qualified
												clinician. You must only follow the guidance of a
												registered medical practitioner. You understand that the
												NICE BNF is written for qualified clinicians and not
												patients.
											</li>
										</ol>
									</li>
									<li>
										Are a clinician, healthcare practitioner or adjacent NHS
										worker (e.g. NHS manager); in which case:
										<ol>
											<li>
												You must be employed or engaged within the UK public
												sector on behalf of the National Health Service and
												using the NICE BNF solely for the benefit of the
												National Health Service and patients.
											</li>
											<li>
												You understand that the guidance contained within the
												NICE BNF is not a substitute for you exercising your own
												professional judgment. Furthermore, you recognise that
												the NICE BNF is one of a range of information sources
												that may inform your judgment and you should not place
												sole reliance on the NICE BNF.
											</li>
										</ol>
									</li>
								</ol>
							</li>
							<li>
								If you are not an individual or a clinician/HCP/NHS worker (as
								defined above), you must contact Us for a commercial licence. If
								you do not, you understand that by Using the NICE BNF you or
								your organisation will be infringing Our intellectual property
								rights.
							</li>
							<li>
								For the avoidance of doubt, the following, without limitation,
								are not permitted to Use the NICE BNF (but may do so by
								contacting RPS and entering into a commercial or academic
								licence):
								<ol>
									<li>
										schools, universities, and other educational establishments,
										or individuals working for or studying at the same (except
										for students using the NICE BNF in the setting of an NHS
										placement);
									</li>
									<li>anyone outside the UK; and/or</li>
									<li>
										companies, businesses, and any other private enterprises
										that are not part of the National Health Service. Companies,
										businesses and any other private enterprises that deliver a
										mix of NHS contracted work and private work must obtain a
										commercial licence from RPS for the non-NHS elements of use.
									</li>
								</ol>
							</li>
							<li>
								<strong>
									Data scraping and data mining of the NICE BNF is not permitted
									by any user for any purpose.
								</strong>
							</li>
						</ol>
					</li>
					<li>
						<span className={styles.section}>Limitation of Usage Rights</span>
						<ol>
							<li>
								You understand that your Use of the NHS BNF is limited as
								follows: -
								<ol>
									<li>
										You may view the NHS BNF on the NICE website or the app, or
										download and store for viewing/reference purposes only onto
										Portable Devices. Your right to do so is non-exclusive,
										non-transferable and non-sublicensable.
									</li>
									<li>
										In no circumstances are you allowed to Use the NICE BNF
										directly or indirectly for commercial gain, benefit, and/or
										exploitation by or for anyone or any enterprise outside of
										the National Health Service in the UK.
									</li>
									<li>
										You may not create hyperlinks to the NICE BNF within any
										computer system or take any steps to make the NICE BNF
										available to anyone except NHS users and patients. If you
										wish to place links to the BNF within your computer systems
										you must contact Us for a linking licence.
									</li>
									<li>
										Data scraping and data mining of the NICE BNF is not
										permitted. Anyone (including NHS bodies) seeking to ingest
										BNF data into a computer system or database must contact Us
										and enter into a data licence. It is prohibited to provide
										the NICE BNF as AI training data for any AI system.
									</li>
									<li>
										You shall not allow any other person to Use the NICE BNF.
									</li>
									<li>
										You are not allowed to distribute or resell the NICE BNF (or
										any part), save that if you are a clinician you are allowed
										to distribute NICE BNF to patients or colleagues to the
										extent necessary to enable you to do your job.
									</li>
									<li>
										You cannot Use the NICE BNF to create other material, such
										as books, articles, or guidance. This does not prevent you
										from referring to appropriately referenced extracts of NICE
										BNF. It does however prevent you from creating other
										materials (such as knowledge or guidance for doctors or
										patients) that is based on, or informed by, the NICE BNF.
									</li>
									<li>
										Any rights not expressly set out above are reserved by Us.
										You shall not have any rights in or to the NICE BNF except
										where granted in these terms. All rights, including
										copyright and database rights, in this digital version of
										the BNF are owned by The Royal Pharmaceutical Society of
										Great Britain and the BMJ Publishing Group Limited and are
										protected under UK and International Law. All rights,
										including copyright and database rights, in this digital
										version of the BNF for Children are owned by Royal
										Pharmaceutical Society of Great Britain, BMJ Publishing
										Group Limited, the Royal College of Paediatrics and Child
										Health and the Neonatal and Paediatric Pharmacists Group and
										are protected under UK and International Law. Please see the
										Notice of Rights for further information -{" "}
										<a href="https://www.nice.org.uk/terms-and-conditions#notice-of-rights">
											https://www.nice.org.uk/terms-and-conditions#notice-of-rights
										</a>
									</li>
									<li>
										For the avoidance of doubt, the NICE UK Open Content Licence
										is not applicable to the NICE BNF.
									</li>
									<li>
										All rights granted in this contract are subject to all
										limitations set out in this contract.
									</li>
								</ol>
							</li>
						</ol>
					</li>
					<li>
						<span className={styles.section}>Liability</span>
						<ol>
							<li>
								The NICE BNF is provided on an ‘as is’ and ‘as available’ basis
								and accordingly We do not give any warranty express of implied
								or make any representation:
								<ol>
									<li>
										That the NICE BNF will be suitable for any particular
										requirement or any particular use
									</li>
									<li>
										That the NICE BNF if complete, accurate or up to date.
									</li>
								</ol>
							</li>
							<li>
								We shall periodically update the NICE BNF in accordance with our
								agreement with NICE and all changes shall be entirely at our
								discretion.
							</li>
							<li>
								Nothing in this contract affects your statutory rights, nor does
								it limit Our liability for death or personal injury caused by
								Our negligence. Otherwise however, in consideration of Us giving
								you permission to Use the NICE BNF for no charge, you agree that
								Our liability arising under or in connection with this contract
								is limited to £1. We are willing to accept a higher level of
								liability if you enter into a commercial contract with us.
							</li>
						</ol>
					</li>
					<li>
						<span className={styles.section}>Ending the Contract</span>
						<ol>
							<li>
								This contract may be terminated by Us at any time if we
								reasonably consider you may have broken the terms. If the
								contract is terminated, your right to Use the NICE BNF
								terminates.
							</li>
						</ol>
					</li>
					<li>
						<span className={styles.section}>Law</span>
						<ol>
							<li>
								This contract is subject to English law and the exclusive
								jurisdiction of the English courts.
							</li>
						</ol>
					</li>
					<li>
						<span className={styles.section}>Defined Terms</span>
						<ol>
							<li>
								Certain terms in this contract have special meanings:
								<ol>
									<li>
										“NICE BNF” means the content from the BNF and the BNF for
										Children made available by NICE from the NICE BNF website .
									</li>
									<li>
										“Portable Device” means mobile electronic devices to which
										text and other content may be downloaded or viewed including
										but not limited to smartphones and text readers, laptops,
										notebooks, mobile phones, portable hard-drives, memory
										sticks and other portable storage devices.
									</li>
									<li>
										“Us” (including “We” or “Our”) means the Pharmaceutical
										Press, the knowledge business of the Royal Pharmaceutical
										Society of Great Britain, a company incorporated in England
										under Royal Charter (number RC000799) and having its
										principal place of business at 66-68 East Smithfield,
										London, E1W 1AW acting on behalf of the owners of the NICE
										BNF as set out in the Notice of Rights. We can be contacted
										by email at{" "}
										<a href="mailto:opsteam@rpharms.com">opsteam@rpharms.com</a>
										.
									</li>
									<li>
										“Use” (or “Using”) means accessing the NICE BNF content to
										display on your web-browser, printing off a single screen
										only and downloading, storing and using the NICE BNF on
										Portable Devices for temporary internal reference purposes
										(e.g. where internet access may present difficulties
										accessing the NICE BNF) and explicitly{" "}
										<strong>excludes</strong> commercial use and use within
										computerised decision support tools and generative AI
										software. At no stage can copies be made of a substantial
										part of the NICE BNF under these terms.
									</li>
									<li>
										“UK” means England, Scotland, Northern Ireland and Wales.
									</li>
								</ol>
							</li>
						</ol>
					</li>
				</ol>
			</div>
		</>
	);
};

export default NotFoundPage;
