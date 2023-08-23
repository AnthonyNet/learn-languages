"use client";

import { useState, useEffect } from "react";
import { Data1, Data2} from "@/interface/Irregular";
import TopMenu from "@/components/TopMenu";


interface Props {
	data1?: Data1[];
	data2: Data2[];
	data3: Data2[];
	phrasal?: Data2[];
}

const backgroundColor = {
	0: "__gradient",
	1: "__gradient",
	2: "__gradient",
	3: "__gradient",
};
export default function Quiz({ data1, data2, data3, phrasal }: Props) {
	const [dataTS, setDataTS] = useState<Data2[]>(data2);
	const [verb, setVerb] = useState<any>([]);
	const [wrongChoices, setWrongChoices] = useState<Data1[]>([]);
	const [start, setStart] = useState<boolean>(false);
	const [answerColor, setAnswerColor] = useState<{ [key: number]: string }>(
		backgroundColor
	);
	const [score, setScore] = useState<number>(0);
	const [wrong, setWrong] = useState<number>(0);

		const getData = async (): Promise<void> => {
			const propsData = phrasal ? await phrasal : await data1;
			setStart(true);
			createData(propsData);

		};

		useEffect(() => {
			getData();
		}, []);

	const createData = (data: any): void => {
		function randomNum() {
			return Math.floor(Math.random() * data.length);
		}
		const trueAnswer = data[randomNum()];
		const addBoolean = () => {
			const all = [
				trueAnswer,
				data[randomNum()],
				data[randomNum()],
				data[randomNum()],
			];

			return all;
		};
		const allAnswers = addBoolean();
		setVerb(trueAnswer);
		setWrongChoices(allAnswers.sort(() => Math.random() - 0.5));
	};


	const checkAnswer = (choice: Data1, index: number): void => {
		if (choice.id === verb.id) {
			setScore(score + 1);
			setAnswerColor((prev) => ({ ...prev, [index]: "__bg_green" }));
			setTimeout(() => {
				setAnswerColor(backgroundColor);
				createData(dataTS);
			}, 1000);

		} else {
			setWrong(wrong + 1);
			setAnswerColor((prev) => ({ ...prev, [index]: "__bg_red" }));
		}
	};

	return (
		<section className="w-screen h-100-dvh pt-[50px] md:pt-[70px] flex flex-col justify-center items-center">
			<TopMenu data1={data1} data2={data2} data3={data3} phrasal={phrasal} createData={createData} setDataTS={setDataTS}/>
			<div className="flex flex-col w-full h-auto max-w-[600px] min-h-[400px] m-auto justify-center lg:justify-around p-6 lg:border-4 border-double rounded-[30px] __border_color ">
				<span className="flex justify-around text-[var(--white)] font-bold">
					<p className="bg-red-500 px-4 py-2 rounded-xl">Špatně: {wrong}</p>
					<p className="bg-green-500 px-4 py-2 rounded-xl">Správně: {score}</p>
				</span>
				<p className="text-lg font-semibold my-4 text-center">
					{(start && verb.cz) || verb.cz_word}
				</p>
				<div className="flex flex-col space-y-2">
					{start &&
						wrongChoices.map((choice: any, index: number) => {
							return (
								<button
									key={index}
									onClick={() => checkAnswer(choice, index)}
									className={
										"py-2 rounded-md shadow-md font-bold duration-300  " +
										answerColor[index]
									}>
									<p className="__text_color2 filter invert">
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
