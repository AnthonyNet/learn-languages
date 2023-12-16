"use client";

import MemoryCard from "./MemoryCard";
import { useState, useEffect, Suspense } from "react";
import TopMenu from "../TopMenu";
import { Data2, Irregular } from "@/interface/Props";
interface Item {
	readonly cz?: string;
	readonly eng?: string;
	readonly select: number;
	check: boolean;
	click: boolean;
}

const styles = {
	h2: "text-lg sm:text-2xl",
	navItem: "__nav-item",
	progress__container: "w-[300px] border-[1px] __border_color rounded-full ",
	progress:
		" h-2.5 rounded-full dark:bg-transparent  transition-all duration-700 ease-in-out __gradient",
	article__cover:
		"m-auto w-full max-w-[1000px] max-h-[700px] h-full grid grow ",
	article:
		"w-full h-full grid grid-cols-2 sm:grid-cols-4 grid-rows-8 sm:grid-rows-3 gap-2 sm:gap-4 grid-flow-row p-2 ",
};

//write simple function which return result of 1+1
interface Props {
	irregular: Irregular[];
	props1: Data2[];
	props2?: Data2[];
}

export default function Memory({ props1, props2, irregular }: Props) {
	const [dataTS, setDataTS] = useState<Data2[] | Irregular[]>([]);

	const [restartCounter, setRestartCounter] = useState<number>(0);
	const [score, setScore] = useState<number>(0);
	const [cards, setCards] = useState<Item[]>([]);
	const [store, setStore] = useState<number[]>([]);
	const [prev, setPrev] = useState<number>(-1);
	const [progress, setProgress] = useState<number>(0);

	const getData = async (): Promise<void> => {
		const propsData = await props1;
		setDataTS(propsData);
	};

	useEffect(() => {
		getData();
	}, []);

	const createData = async (dataLanguage: Irregular[] | Data2[]) => {
		const data = await dataLanguage;
		const RAW = [...data].sort(() => Math.random() - 0.5).slice(0, 6);

		const randomEnglish = RAW.map((item, index) => ({
			select: index,
			eng: item.word,
			check: false,
			click: false,
		}));

		const randomCzech = RAW.map((item, index) => ({
			select: index,
			cz: item.cz_word,
			check: false,
			click: false,
		}));

		setCards(
			[...randomEnglish, ...randomCzech].sort(() => Math.random() - 0.5)
		);
	};

	/* --------------------------------------------------- */
	//       FIRST SETUP
	//	 CreateData gets the first data to show
	/* --------------------------------------------------- */

	useEffect(() => {
		createData(props1);
	}, []);

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
		<>
			<TopMenu
				props1={props1}
				props2={props2}
				createData={createData}
			/>

			<h2 className="text-lg sm:text-2xl">Skóre: {score}</h2>
			<div className="w-[300px] border-[1px] __border_color rounded-full">
				<div
					className="h-2.5 rounded-full dark:bg-transparent  transition-all duration-700 ease-in-out __gradient"
					style={{ width: progress + "%" }}></div>
			</div>
			<div className="m-auto w-full max-w-[1000px] max-h-[700px] h-full grid grow">
				<article className="w-full h-full grid grid-cols-2 sm:grid-cols-4 grid-rows-8 sm:grid-rows-3 gap-2 sm:gap-4 grid-flow-row p-2">
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
			</div>
		</>
	);
}
