import React from "react";
import Link from "next/link";
import DarkModeBtn from "./Select";
import { useState } from "react";
import { NavData } from "@/interface/navdata";
const styles = {
	section: "flex flex-col z-20",
	main__div: "flex justify-between items-center",
	main__div__span: "bottom-2 right-4 text-3xl",
	main__link: "text-2xl font-bold cursor-pointer",

	main: {
		div: "flex flex-row",
		div__div: "mottoCover border-b border-gray-300 my-4 text-sm sm:text-lg",
		icon: "transition duration-700 ease-in-out mr-2",
		icon__open:
			"rotate-90 transition duration-700 ease-in-out mr-2",
		h3: "text-xl mb-2 cursor-pointer transition-all duration-700 ease-in-out",
		h3__open:
			"text-xl mb-2 cursor-pointer  transition-all duration-700 ease-in-out font-bold __border_color",
		ul__open:
			"cursor-pointer transition  duration-100 ease-in-out font-bold ulAnimation",
		ul__li__open: "transition ease-in-out duration-700 ml-[30px]",
	},
} as const;

type Mobile = {
	handleNav: () => void;
	navData: NavData;
};

const Mobile_UL = ({ handleNav, navData }: Mobile) => {
	const [english, setEnglish] = useState(false);
	const [german, setGerman] = useState(false);

	function handleEnglish() {
		setGerman(false);
		setEnglish(!english);
	}

	function handleGerman() {
		setEnglish(false);
		setGerman(!german);
	}

	interface menuItems {
		href: string;
		name: string;
		length?: number;
	}

	const menuItems = (items: menuItems[]) => {
		return items.map((item, index) => {
			return (
				<li
					key={index}
					onClick={handleNav}
					className={styles.main.ul__li__open}>
					<Link href={item.href}>
						{item.name} {item.length && `(${item.length})`}
					</Link>
				</li>
			);
		});
	};

	return (
		<section className={styles.section}>
			<div className={styles.main__div}>
				<Link className={styles.main__link} href="/" onClick={handleNav}>
					Home
				</Link>
				<span className={styles.main__div__span}>
					<DarkModeBtn />
				</span>
			</div>

			<main>
				<div className={styles.main.div}>
					<span
						className={
							!english ? styles.main.icon : styles.main.icon__open
						}>
						➤
					</span>
					<h3
						onClick={handleEnglish}
						className={!english ? styles.main.h3 : styles.main.h3__open}>
						Angličtina
					</h3>
				</div>
				<ul className={english ? styles.main.ul__open : " text-transparent"}>
					{english && (
						<>
							<li onClick={handleNav} className={styles.main.ul__li__open}>
								<Link href="/irregular/eng">
									Nepravidelná slovesa ({navData.irregularEng}){" "}
								</Link>
							</li>
							<li onClick={handleNav} className={styles.main.ul__li__open}>
								<Link href="/memory/eng">
									Slovní pexeso ({navData.irregularEng}){" "}
								</Link>
							</li>
							<li onClick={handleNav} className={styles.main.ul__li__open}>
								<Link href="/quiz/eng">Frázový kvíz ({navData.phrasal}) </Link>
							</li>
							<li onClick={handleNav} className={styles.main.ul__li__open}>
								<Link href="/search/eng">
									Najdi sloveso ({navData.irregularEng}){" "}
								</Link>
							</li>
							<li onClick={handleNav} className={styles.main.ul__li__open}>
								<Link href="/oxford-flip/eng">
									Slovní zásoba C1 ({navData.oxfordC1}){" "}
								</Link>
							</li>
							<li onClick={handleNav} className={styles.main.ul__li__open}>
								<Link href="/oxford/eng">
									Překládej věty C1 ({navData.oxfordC1}){" "}
								</Link>
							</li>
							<li onClick={handleNav} className={styles.main.ul__li__open}>
								<Link href="/pagination">
									Seznam slov ({navData.oxfordB2}){" "}
								</Link>
							</li>
						</>
					)}
				</ul>
				<div className={styles.main.div}>
					<span
						className={
							!german ? styles.main.icon : styles.main.icon__open
						}>
						➤
					</span>
					<h3
						onClick={handleGerman}
						className={!german ? styles.main.h3 : styles.main.h3__open}>
						Němčina
					</h3>
				</div>
				<ul className={german ? styles.main.ul__open : " text-transparent "}>
					{german && (
						<>
							<li onClick={handleNav} className={styles.main.ul__li__open}>
								<Link href="/irregular/ger">
									Nepravidelná slovesa ({navData.irregularGer}){" "}
								</Link>
							</li>
							<li onClick={handleNav} className={styles.main.ul__li__open}>
								<Link href="/memory/ger">
									Slovní pexeso ({navData.irregularGer}){" "}
								</Link>
							</li>
							<li onClick={handleNav} className={styles.main.ul__li__open}>
								<Link href="/quiz/ger">
									Slovesa kvíz ({navData.ger_verbs}){" "}
								</Link>
							</li>
							<li onClick={handleNav} className={styles.main.ul__li__open}>
								<Link href="/oxford-flip/ger">
									Slovní zásoba B2 ({navData.ger_verbs}){" "}
								</Link>
							</li>
							<li onClick={handleNav} className={styles.main.ul__li__open}>
								<Link href="/oxford/ger">
									Překládej věty B2 ({navData.ger_verbs}){" "}
								</Link>
							</li>
							<li onClick={handleNav} className={styles.main.ul__li__open}>
								<Link href="/search/ger">
									Najdi sloveso ({navData.irregularGer}){" "}
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
