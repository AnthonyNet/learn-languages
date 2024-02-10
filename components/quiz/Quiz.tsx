"use client";

import { useState, useEffect } from "react";
import { Irregular, Data2, Phrasal } from "@/interface/Props";
import TopMenu from "@/components/TopMenu";
import { MemorySkeletonSpanDiv } from "../ui/skeletons";

interface Props {
	props1: Data2[] | null;
	props2: Data2[] | null;
	phrasal?: Phrasal[] | null;
}

const backgroundColor = new Array(4).fill("__gradient");

type Definition = {
	id: string;
	word: string;
	cz_word: string;
};

export default function Quiz({ props1, props2, phrasal }: Props) {
	const [definition, setDefinition] = useState<Definition>({
		id: "",
		word: "",
		cz_word: "",
	});
	const [wrongChoices, setWrongChoices] = useState<Irregular[]>([]);
	const [answerColor, setAnswerColor] = useState<{ [key: number]: string }>(
		backgroundColor
	);
	const [score, setScore] = useState<number>(0);
	const [wrong, setWrong] = useState<number>(0);

	const getData = async (): Promise<void> => {
		const propsData = phrasal && (await phrasal);

		createData(propsData);
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
			cz_word: definitionObj.cz_word,
		};
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
			setAnswerColor((prev) => ({ ...prev, [index]: " bg-main-true" }));
			setTimeout(() => {
				setAnswerColor(backgroundColor);
				createData(phrasal);
			}, 1000);
		} else {
			setWrong(wrong + 1);
			setAnswerColor((prev) => ({ ...prev, [index]: " bg-main-false" }));
		}
	};

	return (
		<section className="w-screen h-100-dvh pt-4 flex flex-col justify-center items-center  __small_screen_h-auto">
			<TopMenu
				props1={props1}
				props2={props2}
				phrasal={phrasal}
				createData={createData}
			/>

			<div className="flex flex-col w-full grow  max-w-[600px] min-h-[400px] m-auto justify-center lg:justify-center p-6">
				<span className="flex justify-around text-[var(--white)] font-bold">
					<p className="bg-main-false px-4 py-2 rounded-xl">Špatně: {wrong}</p>
					<p className="bg-main-true px-4 py-2 rounded-xl">Správně: {score}</p>
				</span>
				<p className="text-lg font-semibold my-4 text-center">
					{definition.cz_word}
				</p>
				<div className="flex flex-col space-y-2">
					{wrongChoices.map((choice, index: number) => {
						return (
							<button
								key={index}
								onClick={() => checkAnswer(choice, index)}
								className={
									"py-2 rounded-md shadow-md font-bold duration-300 hover:contrast-150  " +
									answerColor[index]
								}>
								<p className="text-main-secondary filter invert">
									{choice.word}
								</p>
							</button>
						);
					})}
				</div>
			</div>
		</section>
	);
}
