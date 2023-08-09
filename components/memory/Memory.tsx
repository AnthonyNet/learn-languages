"use client";

import MemoryCard from "./MemoryCard";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Item {
	readonly cz?: string;
	readonly eng?: string;
	readonly select: number;
	check: boolean;
	click: boolean;
}

const styles = {
	section:
		"w-full  flex flex-col items-center justify-center pt-[50px] sm:pt-[80px] h-screen",
	menutop__container: "w-full md:max-w-[400px] flex justify-between p-2 font-bold  ",
	h2: "text-lg sm:text-2xl",
	navItem: "__nav-item",
	progress__container: "w-[300px] border-[1px] __border_color rounded-full ",
	progress: " h-2.5 rounded-full dark:bg-transparent  transition-all duration-700 ease-in-out __gradient",
	article__cover:
		"m-auto w-full max-h-[700px] h-full grid items-center grow ",
	article:
		"w-full h-full grid grid-cols-2 sm:grid-cols-4 grid-rows-8 sm:grid-rows-3 gap-2 sm:gap-4 grid-flow-row p-2 ",
};

//write simple function which return result of 1+1
type Props = {
	lang: string;
}
interface Data {
readonly cz: string;
readonly base: string;
readonly past_simple: string;
readonly past_participle: string;
}

export default function Memory({lang}: Props) {
	const supabase = createClientComponentClient();
	const [start, setStart] = useState<boolean>(false);
	const [english, setEnglish] = useState<Data[]>([]);
	const [german, setGerman] = useState<Data[]>([]);
	const [dataTS, setDataTS] = useState<any>([]);

	const [restartCounter, setRestartCounter] = useState<number>(0);
	const [score, setScore] = useState<number>(0);
	const [cards, setCards] = useState<Item[]>([]);
	const [store, setStore] = useState<number[]>([]);
	const [prev, setPrev] = useState<number>(-1);
	const [progress, setProgress] = useState<number>(0);


	const getData = async (): Promise<void> => {
		try {
			const { data: irregular_ger } = await supabase
				.from("irregular_ger")
				.select();
			const { data: irregular_eng } = await supabase
				.from("irregular_eng")
				.select();
			const {data: phrasal_verbs } = await supabase
				.from("phrasal_verbs")
				.select();

			if (irregular_ger && irregular_eng) {
				setEnglish(irregular_eng);
				setGerman(irregular_ger);

				setStart(true);
				if (lang === "ger") {
					setDataTS(irregular_ger);
				}
				if (lang === "eng") {
					setDataTS(irregular_eng);
				}
			}
		} catch (error) {
			console.error("Error in getData:", error);
			throw error;
		}
	};

	useEffect(() => {
	/*	getData().then(() => {
			english && createData(english);
		});*/
		getData();

	}, [supabase, setDataTS]);

	const createData = async (dataLanguage: Data[]) => {
		const data = await dataLanguage;

		const RAW = [...data].sort(() => Math.random() - 0.5).slice(0, 6);

		const randomEnglish = RAW.map((item, index) => ({
			select: index,
			eng: item.base,
			check: false,
			click: false,
		}));

		const randomCzech = RAW.map((item, index) => ({
			select: index,
			cz: item.cz,
			check: false,
			click: false,
		}));

		setCards(
			[...randomEnglish, ...randomCzech].sort(() => Math.random() - 0.5)
		);
	};

	/* --------------------------------------------------- */
	//       FIRST SETUP
	//
	/* --------------------------------------------------- */

	useEffect(() => {
		lang === "eng" ? createData(english) : createData(german);
	}, [start]);

	/* -------------------------------------------------------- */
	/* All answers RIGHT => Restart Field */
	/* ---------------------------- ----------------------------*/
	useEffect(() => {
		// Restart Game
		if (restartCounter == 6) {
			setRestartCounter(0);
			// setProps([...props].sort(() => Math.random() - 0.5));
			createData(dataTS);
			cards.map((card: Item) =>
				setTimeout(() => {
					setProgress(0);
					card.check = false;
					card.click = false;
					// setCards([...cards]);
				}, 1000)
			);
			//setCards([...cards]);
		}
	}, [restartCounter]);

	/* --------------------------------------------------- */
	/*       Compare Cards          */
	/* --------------------------------------------------- */
	function check(current: number) {
		if (cards[prev].select === cards[current].select) {
			setScore(score + 1);
			setProgress(progress + 16.667);
			setRestartCounter(restartCounter + 1);
			setStore([...store, cards[prev].select]);
			setCards(
				cards.map((item: Item, index: number) => {
					if (index === prev || index === current) {
						return { ...item, check: true, click: true };
					} else {
						cards.map((card: Item) => (card.click = false));
						setCards([...cards]);
						return item;
					}
				})
			);
		}
		setPrev(-1);
	}
	/* --------------------------------------------------- */
	//  check if the current card matches the previous card
	/* --------------------------------------------------- */
	function handleClick(cardId: number, selectId: number) {


		if (prev === -1) {
			/*cards[cardId].click = true;*/
			setPrev(cardId);
			return;
		} else {
			if (prev === cardId) {
				return;
			} else {
				check(cardId);
			}
		}
	}

	return (
		<section className={styles.section}>
			<div className={styles.menutop__container}>
				<button onClick={() => {createData(english); setDataTS(english)}} className={styles.navItem}>
					Angličtina
				</button>

				<button onClick={() => {createData(german); setDataTS(german)}} className={styles.navItem}>
					Němčina
				</button>
			</div>
			<h2 className={styles.h2}>Skóre: {score}</h2>
			<div className={styles.progress__container}>
				<div
					className={styles.progress}
					style={{ width: progress + "%" }}></div>
			</div>
			<div className={styles.article__cover}>
				{start && (
					<article className={styles.article}>
						{cards.map((item: Item, index: number) => {
							return (
								<MemoryCard
									key={index}
									id={index}
									item={item}
									handleClick={handleClick}
								/>
							);
						})}
					</article>
				)}
			</div>
		</section>
	);
}
