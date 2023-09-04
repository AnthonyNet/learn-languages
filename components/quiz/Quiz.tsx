"use client";

import { useState, useEffect } from "react";
import {  Irregular, Data2, Phrasal} from "@/interface/Props";
import TopMenu from "@/components/TopMenu";


interface Props {
	irregular: Irregular[] | null;
	props1: Data2[] | null;
	props2: Data2[] | null;
	phrasal?: Phrasal[] | null;
}

const backgroundColor = {
	0: "__gradient",
	1: "__gradient",
	2: "__gradient",
	3: "__gradient",
};
type Definition = {
	id: string;
	word: string;
	cz_word: string;
}
export default function Quiz({ irregular, props1, props2, phrasal }: Props) {

	const [definition, setDefinition] = useState<Definition>({ id: "", word: "", cz_word: "" });
	const [wrongChoices, setWrongChoices] = useState<Irregular[]>([]);
	const [start, setStart] = useState<boolean>(false);
	const [answerColor, setAnswerColor] = useState<{ [key: number]: string }>(
		backgroundColor
	);
	const [score, setScore] = useState<number>(0);
	const [wrong, setWrong] = useState<number>(0);

		const getData = async (): Promise<void> => {
			const propsData = phrasal ? await phrasal : await irregular;

			createData(propsData);
			setStart(true);

		};

		useEffect(() => {
			getData();
		}, []);

	const createData = (data: any): void => {

		function randomNum() {
			return Math.floor(Math.random() * data.length);
		}
		const definitionObj = data[randomNum()];
		const definition = {
			id: definitionObj.id,
			word: definitionObj.word,
			cz_word: definitionObj.cz_word
		}
		const dataArray = () => {
			const all = [
				definition,
				data[randomNum()],
				data[randomNum()],
				data[randomNum()],
			];

			return all;
		};
		const allAnswers = dataArray();
		setDefinition(definitionObj);
		setWrongChoices(allAnswers.sort(() => Math.random() - 0.5));
	};


	const checkAnswer = (choice: Irregular, index: number): void => {
		if (choice.id === definition.id) {
			setScore(score + 1);
			setAnswerColor((prev) => ({ ...prev, [index]: "__bg_green" }));
			setTimeout(() => {
				setAnswerColor(backgroundColor);
				createData(phrasal);
			}, 1000);

		} else {
			setWrong(wrong + 1);
			setAnswerColor((prev) => ({ ...prev, [index]: "__bg_red" }));
		}
	};

	return (
		<section className="w-screen h-100-dvh pt-[50px] md:pt-[70px] flex flex-col justify-center items-center">
			{start && (
				<TopMenu
					irregular={irregular}
					props1={props1}
					props2={props2}
					phrasal={phrasal}
					createData={createData}

				/>
			)}
			<div className="flex flex-col w-full h-auto max-w-[600px] min-h-[400px] m-auto justify-center lg:justify-around p-6 lg:border-4 border-double rounded-[30px] __border_color ">
				<span className="flex justify-around text-[var(--white)] font-bold">
					<p className="bg-red-500 px-4 py-2 rounded-xl">Špatně: {wrong}</p>
					<p className="bg-green-500 px-4 py-2 rounded-xl">Správně: {score}</p>
				</span>
				<p className="text-lg font-semibold my-4 text-center">
					{definition.cz_word}
				</p>
				<div className="flex flex-col space-y-2">
					{start &&
						wrongChoices.map((choice, index: number) => {
							return (
								<button
									key={index}
									onClick={() => checkAnswer(choice, index)}
									className={
										"py-2 rounded-md shadow-md font-bold duration-300  " +
										answerColor[index]
									}>
									<p className="__text_color2 filter invert">{choice.word}</p>
								</button>
							);
						})}
				</div>
			</div>
		</section>
	);
}
