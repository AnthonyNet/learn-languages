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

interface Data {
	readonly cz: string;
	readonly base: string;
	readonly pastSimple: string;
	readonly pastParticiple: string;
	readonly pastParticiple2?: string;
}

const styles = {
	section:
		"w-full  flex flex-col items-center justify-center pt-[50px] sm:pt-[80px] .h-100-dvh",
	section__div: "w-[200px] flex justify-between p-2 font-bold  ",
	h2: "text-lg sm:text-2xl",
	navItem: "__nav-item",
	article_cover:
		" w-full max-h-[800px] h-full grid items-center ",
	article:
		"w-full h-full grid grid-cols-2 sm:grid-cols-4 grid-rows-8 sm:grid-rows-3 gap-2 sm:gap-4 grid-flow-row p-4 sm:p-2 ",
};

//write simple function which return result of 1+1
type Props = {
	lang: string;
}
export default function Memory({lang}: Props) {
	const [start, setStart] = useState<boolean>(false);
	const [english, setEnglish] = useState<any>([]);
	const [german, setGerman] = useState<any>([]);
	const [dataTS, setDataTS] = useState<any>([]);

	const [restartCounter, setRestartCounter] = useState<number>(0);
	const [score, setScore] = useState<number>(0);
	const [cards, setCards] = useState<Item[]>([]);
	const [store, setStore] = useState<number[]>([]);
	const [prev, setPrev] = useState<number>(-1);
	const supabase = createClientComponentClient();

	const getData = async (): Promise<void> => {
		try {
			const { data: irregular_ger } = await supabase
				.from("irregular_ger")
				.select();
			const { data: irregular_eng } = await supabase
				.from("irregular_eng")
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
		createData(english);
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
		createData(english);
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
		cards[cardId].click = true;

		if (prev === -1) {
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
			<div className={styles.section__div}>
				<button onClick={() => createData(english)} className={styles.navItem}>
					English
				</button>
				<button onClick={() => createData(german)} className={styles.navItem}>
					Deutsch
				</button>
			</div>
			<h2 className={styles.h2}>Score: {score}</h2>

			<div className={styles.article_cover}>
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
