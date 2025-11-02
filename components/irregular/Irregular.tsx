"use client";

import { useEffect, useState } from "react";
import { IrregularSkeleton } from "../ui/skeletons";
import { Irregular } from "@/interface/Props";
import Input from "./Card_Input";
import CardHint from "./Card_Hint";
import Score from "./Score";
import Button from "@/components/button/Button";
import { TbZoomQuestion } from "react-icons/tb";
import { RxArrowRight } from "react-icons/rx";

export default function Irregular({ irregular }: { irregular: Irregular[] }) {
	const [start, setStart] = useState(false);
	const [score, setScore] = useState(0);
	const [stars, setStars] = useState(0);
	const [hint, setHint] = useState(false);
	const [rand, setRand] = useState(0);
	const [defaultInput, setDefaultInput] = useState(false);
	const [totalScore, setTotalScore] = useState<number>(0);
	const [dataTS, setDataTS] = useState<Irregular[]>([]);

	// init data from props
	useEffect(() => {
		setDataTS(irregular);
		setStart(true);
		setRand(irregular.length ? Math.floor(Math.random() * irregular.length) : 0);
	}, [irregular]);

	// init localStorage once
	useEffect(() => {
		if (typeof window === "undefined") return;
		const item = localStorage.getItem("totalScore");
		if (item === null) {
			localStorage.setItem("totalScore", "0");
			setTotalScore(0);
		} else {
			// "0" -> 0
			setTotalScore(Number(item) || 0);
		}
	}, []);

	function randomWord() {
		if (!dataTS.length) return;
		setRand(Math.floor(Math.random() * dataTS.length));
		setStars(0);
		setHint(false);
		setDefaultInput((v) => !v);

		const inputs = Array.from(
			document.getElementsByClassName(
				"__card_Input"
			) as HTMLCollectionOf<HTMLInputElement>
		);
		inputs.forEach((input) => {
			input.readOnly = false;
		});
	}

	const current = dataTS[rand];

	return (
		<>
			<main className="mt-[25px] md:text-[140%] lg:text-[100%] max-w-[300px] md:max-w-[400px] h-full md:h-auto flex flex-col justify-center items-center">
				<div className="py-2 px-6">
					Celkové skóre: <span>{totalScore}</span>
				</div>
				<div className="py-2 px-6">
					Momentální skóre: <span>{score > 0 ? score : 0}</span>
				</div>

				<Score score={stars} />

				<div className="px-6 inputs">
					{!start ? (
						<IrregularSkeleton />
					) : (
						<>
							<h5 className="text-3xl dark:bg-black font-medium p-2">
								{current?.cz_word ?? "...loading"}
							</h5>

							<ul className="flex flex-col justify-around text-center mb-2">
								{[
									{ key: "word", label: "Infinitiv" },
									{ key: "past_simple", label: "Minulý čas" },
									{ key: "past_participle", label: "Příčestí minulé" },
								].map(({ key, label }) => (
									<Input
										key={key}
										word={(current as any)?.[key] ?? ""}
										setTotalScore={setTotalScore}
										setScore={setScore}
										setStars={setStars}
										placeholder={label}
										defaultInput={defaultInput}
										totalScore={totalScore}
									/>
								))}
							</ul>
						</>
					)}
				</div>
			</main>

			<footer className="h-auto w-full max-w-[300px] md:max-w-[400px] md:pb-2 flex flex-col">
				<div className="flex justify-around h-[30px]">
					{hint && current ? (
						<CardHint
							word={current.word}
							pastSimple={current.past_simple}
							pastParticiple={current.past_participle}
						/>
					) : null}
				</div>

				<div className="flex justify-around">
					<Button onClick={() => setHint((v) => !v)} description={"Odpověď"}>
						<TbZoomQuestion className="flex items-center justify-center h-8 w-full scale-90 hover:scale-100 opacity-100 cursor-pointer transition:scale ease-in-out delay-100 duration-1000" />
					</Button>

					<Button onClick={randomWord} description={"Další"}>
						<RxArrowRight className="flex items-center justify-center h-8 w-full scale-90 hover:scale-100 opacity-100 cursor-pointer transition:scale ease-in-out delay-100 duration-1000 lg:hover:translate-x-[20px]" />
					</Button>
				</div>
			</footer>
		</>
	);
}
