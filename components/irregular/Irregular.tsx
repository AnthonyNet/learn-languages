"use client";

import { useEffect, useState } from "react";
import { Suspense } from "react";
import { IrregularSkeleton } from "../ui/skeletons";
import { Irregular } from "@/interface/Props";
import Input from "./Card_Input";
import CardHint from "./Card_Hint";
import Score from "./Score";
import Button from "@/components/button/Button";
import { TbZoomQuestion } from "react-icons/tb";
import { RxArrowRight } from "react-icons/rx";

export default function Irregular({ irregular }: { irregular: Irregular[] }) {
	const [start, setStart] = useState<boolean>(false);
	const [score, setScore] = useState<number>(0);
	const [stars, setStars] = useState<number>(0);
	const [hint, setHint] = useState<boolean>(false);
	const [rand, setRand] = useState<number>(0);
	const [defaultInput, setDefaultInput] = useState<boolean>(false);

	const [totalScore, setTotalScore] = useState<number | any>(null);

	const [dataLength, setDataLength] = useState<number>(136);
	const [dataTS, setDataTS] = useState<Irregular[] | []>([]);

	useEffect(() => {
		const getPropsData = async () => {
			const data = await irregular;
			setDataLength(irregular.length);
			setDataTS(irregular);
			setStart(true);
		};
		getPropsData();
	}, []);

	/*------------------------------------------
  SET LOCAL STRORAGE IF NOT EXISTS
   ------------------------------------------*/

	if (typeof window !== "undefined") {
		// do localStorage stuff here
		const item = localStorage.getItem("totalScore");
		if (item == null || undefined) {
			// localStorage.setItem('totalScore',JSON.stringify('0'));
			localStorage.setItem("totalScore", "0");
		}
	}

	/*------------------------------------------
   SET TOTAL SCORE FROM LOCAL STORAGE ONE TIME
  ------------------------------------------*/
	useEffect(() => {
		setTotalScore(JSON.parse(localStorage.getItem("totalScore") || ""));
		//   setTotalScore(JSON.parse(localStorage.getItem('totalScore') || ''));
	}, []);

	/*------------------------------------------
AFTER CLICK ON <CardButton />
GIVES RANDOM NUMBER
RESET NUMBER OF STARS
HIDE HINTS
------------------------------------------*/

	function randomWord() {
		setRand(Math.floor(Math.random() * dataLength));
		setStars(0);
		setHint(false);
		setDefaultInput(!defaultInput);

		const inputs = document.getElementsByClassName("__card_Input");
		for (let i = 0; i < inputs.length; i++) {
			let item = inputs[i] as HTMLInputElement;
			item.readOnly = false;
		}
	}

	return (
		<div className="w-full h-full md:h-auto md:w-auto min-w-[350px] flex flex-col justify-center items-center md:border-4 border-double __border_color rounded-[50px] text-center">
			<main className="mt-[25px] md:text-[140%] lg:text-[100%] max-w-[300px] md:max-w-[400px] h-full md:h-auto flex flex-col justify-center items-center">
				<div className="py-2 px-6">
					Celkové skóre: <span>{totalScore}</span>
				</div>
				<div className="py-2 px-6">
					Momentální skóre: <span>{score > 0 ? score : 0}</span>
				</div>

				<Score score={stars} />

				<div className="px-6 inputs">
					<Suspense fallback={<IrregularSkeleton />}>
						<h5 className="text-3xl dark:bg-black font-medium p-2">
							{start ? dataTS[rand]?.cz_word || "...loading" : ""}
						</h5>
						<ul className="flex flex-col justify-around text-center mb-2">
							{Object.values(dataTS[rand] || {})
								.slice(2)
								.map((value, index) => {
									const array = ["Infinitiv", "Minulý čas", "Příčestí minulé"];
									return (
										<Input
											key={index}
											word={value}
											setTotalScore={setTotalScore}
											setScore={setScore}
											setStars={setStars}
											placeholder={array[index]}
											defaultInput={defaultInput}
											totalScore={totalScore}
										/>
									);
								})}
						</ul>
					</Suspense>
				</div>
			</main>

			<footer className="h-auto w-full max-w-[300px] md:max-w-[400px] md:pb-2 flex flex-col">
				<div className="flex justify-around h-[30px]">
					{hint ? (
						<CardHint
							word={dataTS[rand]?.word}
							pastSimple={dataTS[rand]?.past_simple}
							pastParticiple={dataTS[rand]?.past_participle}
						/>
					) : null}
				</div>

				<div className="flex justify-around">
					<Button onClick={() => setHint(!hint)}>
						<TbZoomQuestion className="flex items-center justify-center h-full w-full scale-90 hover:scale-100 opacity-100 cursor-pointer transition:scale ease-in-out delay-100 duration-1000" />
					</Button>

					<Button onClick={randomWord}>
						<RxArrowRight className="flex items-center justify-center h-full w-full scale-90 hover:scale-100 opacity-100 cursor-pointer transition:scale ease-in-out delay-100 duration-1000 lg:hover:translate-x-[20px]" />
					</Button>
				</div>
			</footer>
		</div>
	);
}
