"use client";

import { useState, useEffect } from "react";

interface Props {
	word: string | any;
	setTotalScore: React.Dispatch<React.SetStateAction<number>>;
	setScore: React.Dispatch<React.SetStateAction<number>>;
	setStars: React.Dispatch<React.SetStateAction<number>>;
	placeholder: string;
	defaultInput: boolean;
	totalScore: number;
}

const styles = {
	li: "m-1 p-1 font-bold border-2 rounded-xl focus:mainCardBorder borderShadow  __border_hover",
	li_green: "p-2 font-bold",
	input:
		"__card_Input w-full text-center text-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent rounded-md p-1  hover:shadow-lg transition ease-in-out duration-500 bg-transparent",
};

/*------------------------------------------
  Input Component
------------------------------------------*/

const Input = ({
	word,
	setTotalScore,
	setScore,
	setStars,
	placeholder,
	defaultInput,
	totalScore,
}: Props) => {
	const [input, setInput] = useState<string>("");
	const [checkMistake, setCheckMistake] = useState("");
	const [checkStyles, setCheckStyles] = useState("");

	//Save Input value into INPUT variable
	//Set read only for Input
	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setInput(e.target.value);

		if (word === e.target.value) {
			e.target.readOnly = true;
		}
	};

	// Watch INPUT variable for changes
	useEffect(() => {
		runIT();
	}, [input]);

	const runIT = () => {
		if (word === input) {
			// True === green border
			setCheckStyles("border-main-true border-inset");

			//Props - SCORE + STARS
			setTotalScore((count: number) => count + 1);
			setScore((count: number) => count + 1);
			setStars((count: number) => count + 1);

			const number = totalScore + 1;
			localStorage.setItem("totalScore", JSON.stringify(number));
		}
		//word --> exact word
		if (word.startsWith(input)) {
			// True === GREEN TEXT
			setCheckMistake("text-green-500");
		} else {
			setCheckMistake("text-red-500");
		}
	};

	/*------------------------------------------
WATCH defaultInput for changes TRUE/FALSE
setCheckStyles TRUE / FALSE
setReadOnly TRUE / FALSE
setInput => CLEAR VALUE IN INPUT
------------------------------------------*/

	useEffect(() => {
		setCheckStyles("border-main");
		setInput("");
	}, [defaultInput]);

	return (
		<li className={styles.li + " " + checkStyles}>
			<input
				type="text"
				value={input}
				className={styles.input + " " + checkMistake}
				onChange={handleChange}
				placeholder={placeholder}
			/>
		</li>
	);
};

export default Input;
