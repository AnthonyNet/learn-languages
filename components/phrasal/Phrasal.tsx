"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import "./phrasal.css";
export default function Phrasal() {
	const supabase = createClientComponentClient();
	const [phrasalVerbs, setPhrasalVerbs] = useState<any>([]);
	const [verb, setVerb] = useState<any>([]);
	const [wrongChoices, setWrongChoices] = useState<any>([]);
	const [start, setStart] = useState<boolean>(false);
	const [answerColor, setAnswerColor] = useState<string>("");
	const [score, setScore] = useState<number>(0);

	const createData = (data: any): void => {
		function randomNum() {
			return Math.floor(Math.random() * data.length); // Use data.length to get the number of elements
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

	const getData = async (): Promise<void> => {
		try {
			const { data: phrasal_verbs } = await supabase
				.from("phrasal_verbs")
				.select();

			if (phrasal_verbs && phrasal_verbs.length > 0) {
				// Make sure phrasal_verbs is not empty
				createData(phrasal_verbs);
				setPhrasalVerbs(phrasal_verbs);
				setStart(true);
			}
		} catch (error) {
			console.error("Error in getData:", error);
			throw error;
		}
	};

	useEffect(() => {
		getData();
	}, [supabase]);

	const checkAnswer = (choice: any, index: number): void => {

		if (choice.id === verb.id) {
			setScore(score + 1);
			setAnswerColor("__green_focus");
			setTimeout(() => {
				setAnswerColor("");
				createData(phrasalVerbs);
			}, 1000);
		} else {
			setAnswerColor("__red_focus");
		}
	};


	return (
		<section className="w-screen h-100-dvh ">
			<div className="flex flex-col w-full max-w-[600px] min-h-[400px] m-auto h-full justify-center p-6">
				<p className="text-center">Skóre: {score}</p>
				<p className="text-lg font-semibold my-4 text-center">{start && verb.cz}</p>
				<div className="flex flex-col space-y-2">
					{start &&
						wrongChoices.map((choice: any, index: number) => {

							return (
								<button
									key={index}
									onClick={() => checkAnswer(choice, index)}
									className={
										"text-white py-2 rounded-md shadow-md font-bold duration-300 __gradient __text_color2  " + answerColor}>
									{choice.base}
								</button>
							);
						})}
				</div>
			</div>
		</section>
	);
}
