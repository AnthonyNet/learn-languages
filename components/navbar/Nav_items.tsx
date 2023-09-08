
import Link from "next/link";
import { NavData } from "@/interface/navdata";
import Options from "./Options";
const styles = {
	article: "justify-end gap-16 items-center w-[90%] h-full hidden md:flex",
	homeBtn: "font-bold hover:text-indigo-800 __nav-item",
	container: "relative inline-block tooltip text-xl xl:text-3xl",
	main__a: "px-2 py-1 font-semibold uppercase  __nav-item", //ulAnimation
	cover:
		"flex flex-col p-4 w-60 md:w-[320px] lg:w-[350px] h-auto md:h-auto rounded-md z-20 absolute right-0 invisible tooltip-item border-2 tooltip-item __nav_cover",
	ul: "list-disc space-y-2 style-",

	ul__li:
		"flex items-start text-sm md:text-xl font-extrabold  transition duration-700 ease-in-out transform __nav_li",
} as const;

export default function NavItems({navData} : {navData: NavData}) {


	return (
		<article className={styles.article}>
			<div className={styles.container}>
				<a href="#" className={styles.main__a}>
					Angličtina
				</a>
				<div className={styles.cover}>
					<ul className={styles.ul}>
						<li className={styles.ul__li}>
							<Link href="/irregular/eng">
								Nepravidelná slovesa ({navData.irregularEng}){" "}
							</Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/memory/eng">Slovní pexeso</Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/quiz/eng">Kvíz</Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/oxford-flip/eng">Flip karta</Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/oxford/eng">Akordeón věty</Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/search/eng">
								Najdi sloveso ({navData.irregularEng}){" "}
							</Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/pagination">
								Seznam slov B2 ({navData.oxfordB2}){" "}
							</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className={styles.container}>
				<a href="#" className={styles.main__a}>
					Němčina
				</a>

				<div className={styles.cover}>
					<ul className={styles.ul}>
						<li className={styles.ul__li}>
							<Link href="/irregular/ger">
								Nepravidelná slovesa ({navData.irregularGer}){" "}
							</Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/memory/ger">Slovní pexeso</Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/quiz/ger">Kvíz</Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/oxford-flip/ger">Flip karta</Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/oxford/ger">Akordeón věty</Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/search/ger">
								Najdi sloveso ({navData.irregularGer}){" "}
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<span className="hidden md:flex bottom-2 right-4 text-3xl">
				<Options />
			</span>
		</article>
	);
}
