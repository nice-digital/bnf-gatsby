import { Card } from "@nice-digital/nds-card";
import type { Document } from "@nice-digital/search-client";

import styles from "./SearchCardList.module.scss";

export interface SearchCardListProps {
	documents: Document[];
}

export const SearchCardList: React.FC<SearchCardListProps> = ({
	documents,
}) => {
	console.log("search card list documents ", documents);
	return (
		<>
			<ol className={styles.list}>
				{documents.map((item: Document) => {
					const {
						id,
						title,
						guidanceRef,
						metaDescription,
						pathAndQuery,
						teaser,
						subSectionLinks,
					} = item;
					return (
						<li className={styles.listItem} key={id}>
							<Card
								className={styles.card}
								elementType="div"
								headingText={
									<>
										<span dangerouslySetInnerHTML={{ __html: title }} />
									</>
								}
								headinglink={pathAndQuery}
								summary={<span dangerouslySetInnerHTML={{ __html: teaser }} />}
								link={{
									destination: pathAndQuery,
								}}
								metaData={metaDescription}
							/>
						</li>
					);
				})}
			</ol>
		</>
	);
};
