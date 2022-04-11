import { Link } from "gatsby";
import { type ReactElement, type VFC } from "react";

import styles from "./TagList.module.scss";

export interface TagListProps {
	children: ReactElement<TagProps> | ReactElement<TagProps>[];
	[prop: string]: unknown;
}

export const TagList: VFC<TagListProps> = ({ children, ...attrs }) => (
	<ol className={styles.list} {...attrs}>
		{children}
	</ol>
);

export interface TagProps {
	href: string;
	children: string;
}

export const Tag: VFC<TagProps> = ({ href, children }) => (
	<li>
		<Link
			className={styles.tag}
			to={href}
			dangerouslySetInnerHTML={{ __html: children }}
		/>
	</li>
);
