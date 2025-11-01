import React from "react";
import Button from "../button/Button";
import { RxArrowRight } from "react-icons/rx";

const styles = {
	h3: "py-1  text-center  w-auto mx-auto border-main",
	button:
		"flex items-center justify-center  h-8 w-full scale-90 hover:scale-100 opacity-100 cursor-pointer transition:scale ease-in-out delay-100 duration-1000",

	cardBack:
		"absolute top-0 left-0 my-rotate-y-180 backface-hidden  w-full h-full  __oxford_card_background",
	cardBack__div: "h-full text-center flex flex-col  ",
	cardBack__answersCover:
		"w-full h-full flex flex-col justify-center md:p-4 grow",
	cardBack__btnCover:
		"w-full h-[70px] flex justify-center  xl:border-t-2 border-main ",
};

interface Props {
	props: {
		switchSide: boolean;
		setSwitchSide: React.Dispatch<React.SetStateAction<boolean>>;
		switchLanguage: boolean;
		sentenceExample?: string;
		word: string;
		cz_word: string;
		sentence: string;
		cz_sentence: string;
		stylesProp: string;
	};
}
export default function Card_Back({ props }: Props) {
	const {
		switchSide,
		setSwitchSide,
		switchLanguage,
		word,
		sentence,
		cz_word,
		cz_sentence,
	} = props;
	return (
		<div className={styles.cardBack}>
			<div className={styles.cardBack__div}>
				{switchLanguage ? (
					<div className={styles.cardBack__answersCover}>
						<h3 className={styles.h3 + " font-bold text-[120%]"}>{word}</h3>
						<h3 className={styles.h3}>{sentence}</h3>
						<h3 className={styles.h3 + " font-bold text-[120%]"}>{cz_word}</h3>
						<h3 className={styles.h3}>{cz_sentence}</h3>
					</div>
				) : (
					<div className={styles.cardBack__answersCover}>
						<h3 className={styles.h3 + " font-bold text-[120%]"}>{word}</h3>
						<h3 className={styles.h3}>{sentence}</h3>
						<h3 className={styles.h3 + " font-bold text-[120%]"}>{cz_word}</h3>
						<h3 className={styles.h3}>{cz_sentence}</h3>
					</div>
				)}

				<div className={styles.cardBack__btnCover}>
					{!switchSide && (
						<Button onClick={() => setSwitchSide(!switchSide)} description={"Další"}>
							<RxArrowRight className={props.stylesProp} />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
