import React from "react";

const styles = {
	card__text__cover:
		"pt-[25px]  w-full  flex flex-col justify-center grow ",
	h3: "py-2 md:py-4  text-center   w-auto mx-auto __border_color",
};

interface Props {
	switchLanguage: boolean;
	word: string;
	sentence: string;
	cz_word: string;
	cz_sentence: string;
}
const Text_Card = ({ switchLanguage, word, sentence, cz_word, cz_sentence }: Props) => {
	return (
		<article className={styles.card__text__cover}>
			{switchLanguage ? (
				<>
					<h3 className={styles.h3 + " font-bold text-[120%]"}>{word}</h3>
					<h3 className={styles.h3}>{sentence}</h3>
				</>
			) : (
				<>
					<h3 className={styles.h3 + " font-bold text-[120%]"}>{cz_word}</h3>
					<h3 className={styles.h3}>{cz_sentence}</h3>
				</>
			)}
		</article>
	);
};

export default Text_Card;
