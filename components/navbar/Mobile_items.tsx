import React from "react";
import Link from "next/link";
import Options from "./Options";
import { useState } from "react";
import { NavData } from "@/interface/navdata";
import clsx from "clsx";

const styles = {
	div: "flex flex-row",
	div__div: "border-b border-gray-300 my-4 text-sm sm:text-lg",
	icon: "transition duration-700 ease-in-out mr-2",
	icon__open: "rotate-90 transition duration-700 ease-in-out mr-2",
	h3: "text-xl mb-2 cursor-pointer transition-all duration-700 ease-in-out",
	h3__open:
		"text-xl mb-2 cursor-pointer  transition-all duration-700 ease-in-out font-bold",
	ul__open:
		"cursor-pointer transition  duration-100 ease-in-out font-bold ulAnimation",
	ul__li__open: "transition ease-in-out duration-700 ml-[30px]",
} as const;

type Mobile = {
	handleNav: () => void;
	navData: NavData;
};

const Mobile_UL = ({ handleNav, navData }: Mobile) => {
	const [english, setEnglish] = useState(false);
	const [german, setGerman] = useState(false);
	const [acronyms, setAcronyms] = useState(false);

	function handleEnglish() {
		setGerman(false);
		setEnglish(!english);
	}

	function handleGerman() {
		setEnglish(false);
		setGerman(!german);
	}
	function handleAcronyms() {
		setAcronyms(!acronyms);
	}

	interface menuItems {
		href: string;
		name: string;
		length?: number;
	}

	const menuItems = (items: menuItems[]) => {
		return items.map((item, index) => {
			return (
				<li key={index} onClick={handleNav} className={styles.ul__li__open}>
					<Link href={item.href}>
						{item.name} {item.length && `(${item.length})`}
					</Link>
				</li>
			);
		});
	};

	return (
		<section className="flex flex-col z-20">
			<div className="flex justify-start items-center py-2">
				<span className="bottom-2 right-4 text-3xl">
					<Options />
				</span>
			</div>

			<main>
				<div className={styles.div}>
					<span className={clsx(!english ? styles.icon : styles.icon__open)}>
						➤
					</span>
					<h3
						onClick={handleEnglish}
						className={clsx(!english ? styles.h3 : styles.h3__open)}>
						Angličtina
					</h3>
				</div>
				<ul className={english ? styles.ul__open : " text-transparent"}>
					{english && (
						<>
							<li onClick={handleNav} className={styles.ul__li__open}>
								<Link href="/irregular/eng">
									Nepravidelná slovesa ({navData.irregularEng}){" "}
								</Link>
							</li>
							<li onClick={handleNav} className={styles.ul__li__open}>
								<Link href="/memory/eng">Slovní pexeso</Link>
							</li>
							<li onClick={handleNav} className={styles.ul__li__open}>
								<Link href="/quiz/eng">Kvíz</Link>
							</li>
							<li onClick={handleNav} className={styles.ul__li__open}>
								<Link href="/search/eng">
									Najdi sloveso ({navData.irregularEng}){" "}
								</Link>
							</li>
							<li onClick={handleNav} className={styles.ul__li__open}>
								<Link href="/oxford-flip/eng">Flip karta</Link>
							</li>
							<li onClick={handleNav} className={styles.ul__li__open}>
								<Link href="/oxford/eng">Akordeón věty</Link>
							</li>
							<li onClick={handleNav} className={styles.ul__li__open}>
								<Link href="/pagination">
									Seznam slov B2 ({navData.oxfordB2}){" "}
								</Link>
							</li>
						</>
					)}
				</ul>
				<div className={styles.div}>
					<span className={!german ? styles.icon : styles.icon__open}>➤</span>
					<h3
						onClick={handleGerman}
						className={!german ? styles.h3 : styles.h3__open}>
						Němčina
					</h3>
				</div>
				<ul className={german ? styles.ul__open : " text-transparent "}>
					{german && (
						<>
							<li onClick={handleNav} className={styles.ul__li__open}>
								<Link href="/irregular/ger">
									Nepravidelná slovesa ({navData.irregularGer}){" "}
								</Link>
							</li>
							<li onClick={handleNav} className={styles.ul__li__open}>
								<Link href="/memory/ger">Slovní pexeso</Link>
							</li>
							<li onClick={handleNav} className={styles.ul__li__open}>
								<Link href="/quiz/ger">Kvíz</Link>
							</li>
							<li onClick={handleNav} className={styles.ul__li__open}>
								<Link href="/oxford-flip/ger">Flip karta</Link>
							</li>
							<li onClick={handleNav} className={styles.ul__li__open}>
								<Link href="/oxford/ger">Akordeón věty</Link>
							</li>
							<li onClick={handleNav} className={styles.ul__li__open}>
								<Link href="/search/ger">
									Najdi sloveso ({navData.irregularGer}){" "}
								</Link>
							</li>
						</>
					)}
				</ul>
				<div className={styles.div}>
					<span className={!acronyms ? styles.icon : styles.icon__open}>➤</span>
					<h3
						onClick={handleAcronyms}
						className={!acronyms ? styles.h3 : styles.h3__open}>
						Comptia ({navData.acronyms}){" "}
					</h3>
				</div>
				<ul className={acronyms ? styles.ul__open : " text-transparent "}>
					{acronyms && (
						<>
							<li onClick={handleNav} className={styles.ul__li__open}>
								<Link href="/oxford-flip/comptia/acronyms">
									Zkratky karty
								</Link>
							</li>

						</>
					)}
				</ul>
			</main>
		</section>
	);
};

export default Mobile_UL;
