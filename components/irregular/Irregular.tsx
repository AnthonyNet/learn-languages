"use client";

import { useEffect, useState } from "react";
import Irregular from "@/interface/Irregular";
import Input from "./Card_Input";
import CardHint from "./Card_Hint";

import Score from "./Score";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Button from "@/components/button/Button";
import { TbZoomQuestion } from "react-icons/tb";
import { RxArrowRight } from "react-icons/rx";

const styles = {
	section:
		"mt-[50px] md:mt-[70px] py-4  w-screen  flex flex-col md:justify-center   items-center __responsiveSection __small_screen_h-auto",
	section__container:
		"mt-[25px] md:text-[140%] max-w-[300px] md:max-w-[400px] h-full md:h-auto flex flex-col justify-center items-center   rounded-t-3xl text-center lg:border-x-4 lg:border-t-4 border-double __border_color ",
	score__container: "py-2 px-6 ",
	hint__section:
		"h-auto w-full max-w-[300px] md:max-w-[400px] md:pb-2 flex flex-col lg:border-x-4 lg:border-b-4 border-double rounded-b-3xl __border_color",
	buttons__container:
		"flex justify-around md:justify-center  gap-x-16 w-full  items-center text-center  __border_color ",
	button:
		"flex items-center justify-center  h-full w-full scale-90 hover:scale-100   opacity-100 cursor-pointer transition:scale ease-in-out delay-100 duration-1000",
	button__animation: " lg:hover:translate-x-[20px] ",

	h5: "text-3xl dark:bg-black font-medium p-2",
	ul: "flex flex-col justify-around text-center mb-2",
} as const;

type Props = {
	lang: string;
}
export default function Irregular({lang}: Props) {
	const [start, setStart] = useState<boolean>(false);
	const [score, setScore] = useState<number>(0);
	const [stars, setStars] = useState<number>(0);
	const [hint, setHint] = useState<boolean>(false);
	const [rand, setRand] = useState<number>(0);
	const [defaultInput, setDefaultInput] = useState<boolean>(false);

	const [totalScore, setTotalScore] = useState<number | any>(null);

	const [dataLength, setDataLength] = useState<number>(136);
	const [dataTS, setDataTS] = useState<Irregular[]|[]>([]);
	const supabase = createClientComponentClient();

	useEffect(() => {
		const getData = async () => {
			const { data: irregular_ger } = await supabase.from("irregular_ger").select();
			const { data: irregular_eng } = await supabase.from("irregular_eng").select();


			if (irregular_ger && lang === "ger") {
				setDataLength(irregular_ger.length);
				setDataTS(irregular_ger);
				setStart(true);
			}
			if (irregular_eng && lang === "eng") {
				setDataLength(irregular_eng.length);
				setDataTS(irregular_eng);
				setStart(true);
				console.log(dataTS);

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
			<div className={styles.section__container}>
				<div className={styles.score__container}>
					Celkové skóre: <span>{totalScore}</span>
				</div>
				<div className={styles.score__container}>
					Momentální skóre: <span>{score > 0 ? score : 0}</span>
				</div>

				<Score score={stars} />

				<div className="px-6 inputs">
					<h5 className={styles.h5}>{start ? dataTS[rand].cz : "...loading"}</h5>
					<ul className={styles.ul}>
						{start &&
							Object.values(dataTS[rand])
								.slice(2)
								.map((value, index) => {
									const array = ["Infinitiv", "Minulý čas", "Příčestí minulé"];
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
			</div>

			<section className={styles.hint__section}>
				{/* IF HINT == TRUE SHOW ANSWERS */}
				<div className={styles.buttons__container + "h-[30px]"}>
					{hint && start ? (
						<CardHint
							base={dataTS[rand].base}
							pastSimple={dataTS[rand].past_simple}
							pastParticiple={dataTS[rand].past_participle}
						/>
					):null}
				</div>

				<div className={styles.buttons__container}>
					{/* TOGGLE HINT !HINT */}

					<Button onClick={() => setHint(!hint)}>
						<TbZoomQuestion className={styles.button} />
					</Button>

					<Button onClick={() => randomWord()}>
						<RxArrowRight
							className={styles.button + " " + styles.button__animation}
						/>
					</Button>
				</div>
			</section>
		</section>
	);
}
