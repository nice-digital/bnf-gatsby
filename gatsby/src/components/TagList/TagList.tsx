import { Link } from "gatsby";
import { type ReactElement, type FC } from "react";

import styles from "./TagList.module.scss";

export interface TagListProps {
	children: ReactElement<TagProps>[];
	[prop: string]: unknown;
}

export const TagList: FC<TagListProps> = ({ children, ...attrs }) => (
	<ol className={styles.list} {...attrs}>
		{children}
	</ol>
);

export interface TagProps {
	href: string;
	text: string;
}

export const Tag: FC<TagProps> = ({ href, text }) => (
	<li>
		<Link
			className={styles.tag}
			to={href}
			dangerouslySetInnerHTML={{ __html: text }}
		/>
	</li>
);
