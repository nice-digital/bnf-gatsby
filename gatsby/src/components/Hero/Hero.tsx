import React from "react";

import styles from "./Hero.module.scss";

type HeroProps = {
	id: string;
	title: string;
	intro: string;
};

export const Hero: React.FC<HeroProps> = (props: HeroProps) => {
	const { id, title, intro } = props;
	return (
		<div className={styles.hero} id={id}>
			<div className={styles.hero_container}>
				<div className={styles.hero__body}>
					<div className={styles.hero__copy}>
						<h1 className={styles.hero__title}>{title}</h1>
						{intro && <p className={styles.hero__intro}>{intro}</p>}
					</div>
				</div>
			</div>
		</div>
	);
};
