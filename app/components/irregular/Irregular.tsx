"use client";

import { useEffect, useState } from "react";

import Input from "./Card_Input";
import CardButton from "./Card_Button";
import CardHint from "./Card_Hint";

import Score from "./Score";

import { RxArrowRight } from "react-icons/rx";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const styles = {
	section:
		"section_Responsive flex justify-center items-center responsiveSection",
	section_div:
		"max-w-sm card my-8 xl:my-0 rounded-3xl text-center border-4 border-double __border_color",
	score_div: "py-3 px-6 ",
	btn_div:
		"min-h-[50px]  flex flex-row h-auto justify-center items-center px-4 rounded-full mb-2 font-bold",
	h5: "text-3xl dark:bg-black font-medium p-4",
	ul: "flex flex-col justify-around text-center mb-2",
} as const;

type Props = {
	lang: string;
}
export default function Irregular({lang}: Props) {
	const [score, setScore] = useState<number>(0);
	const [stars, setStars] = useState<number>(0);
	const [hint, setHint] = useState<boolean>(false);
	const [rand, setRand] = useState<number>(0);
	const [defaultInput, setDefaultInput] = useState<boolean>(false);

	const [totalScore, setTotalScore] = useState<number | any>([]);

	const [dataLength, setDataLength] = useState<number>(136);
	const [dataTS, setDataTS] = useState<any>(null);
	const supabase = createClientComponentClient();

	useEffect(() => {
		const getData = async () => {
			const { data: irregular_ger } = await supabase.from("irregular_ger").select();
			const { data: irregular_eng } = await supabase.from("irregular_eng").select();


			if (irregular_ger && lang === "ger") {
				setDataLength(irregular_ger.length);
				setDataTS(irregular_ger);
			}
			if (irregular_eng && lang === "eng") {
				setDataLength(irregular_eng.length);
				setDataTS(irregular_eng);
			}
		};

		getData();
	}, [supabase, setDataTS]);

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

		const inputs = document.getElementsByClassName("card_Input");
		for (let i = 0; i < inputs.length; i++) {
			let item = inputs[i] as HTMLInputElement;
			item.readOnly = false;
		}
	}

	return (
		<section className={styles.section}>
			<div className={styles.section_div}>
				<div className={styles.score_div}>
					Celkové skóre: <span>{totalScore}</span>
				</div>
				<div className={styles.score_div}>
					Momentální skóre: <span>{score > 0 ? score : 0}</span>
				</div>

				<Score score={stars} />

				<div className="px-6 inputs">
					<h5 className={styles.h5}>{dataTS ? dataTS[rand].cz : "no data"}</h5>
					<ul className={styles.ul} id={dataTS && dataTS[rand].id}>
						{dataTS &&
							Object.values(dataTS[rand])
								.slice(2)
								.map((value, index) => {

									const array = [
										"Present Simple",
										"Past Simple",
										"Past Participle",
									];
									return (
										<Input
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
				</div>

				<div className="flex flex-row w-full justify-around">
					<div className={styles.btn_div + " __background2"}>
						{/* TOGGLE HINT !HINT */}
						<CardButton hint={hint} setHint={setHint} />
					</div>
					<div className={styles.btn_div + " __background2"}>
						<RxArrowRight
							onClick={() => randomWord()}
							className="w-[40px] h-[40px] transition  ease-in-out duration-500 hover:scale-75 __text_color2"
						/>
					</div>
				</div>

				{/* IF HINT == TRUE SHOW ANSWERS */}
				{hint ? (
					<div className={styles.btn_div}>
						<CardHint
							base={dataTS[rand].base}
							pastSimple={dataTS[rand].past_simple}
							pastParticiple={dataTS[rand].past_participle}
						/>
					</div>
				) : null}
			</div>
		</section>
	);
}