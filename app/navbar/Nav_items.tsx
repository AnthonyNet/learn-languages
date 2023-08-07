
import Link from "next/link";

const styles = {
	article: "justify-around items-center w-[90%] h-full hidden md:flex",
	homeBtn: "font-bold hover:text-indigo-800 __nav-item",
	container: "relative inline-block tooltip text-xl xl:text-3xl",
	main__a: "px-2 py-1 font-medium   __nav-item", //ulAnimation
	cover:
		"flex flex-col p-4 w-60 h-auto rounded-md z-20 absolute right-0 invisible tooltip-item border-2 tooltip-item __nav_cover",
	ul: "list-disc space-y-2 style-",

	ul__li:
		"flex items-start text-sm font-extrabold  transition duration-700 ease-in-out transform",
} as const;

interface NavData {
	irregularEng: number;
	irregularGer: number;
	oxfordB2: number;
}

export default function NavItems({navData} : {navData: NavData}) {

	return (
		<article className={styles.article}>
			<Link href="/" className={styles.homeBtn}>
				Domů
			</Link>

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
							<Link href="/memory/eng">
								Dvojice ({navData.irregularEng}){" "}
							</Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/search/eng">
								Najdi sloveso ({navData.irregularEng}){" "}
							</Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/oxford">Akordeon cvičení B2 ({navData.oxfordB2}) </Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/oxford-flip">Karta cvičení B2 ({navData.oxfordB2}) </Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/pagination">Seznam slov ({navData.oxfordB2}) </Link>
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
							<Link href="/memory/ger">
								Dvojice ({navData.irregularGer}){" "}
							</Link>
						</li>
						<li className={styles.ul__li}>
							<Link href="/search/ger">
								Najdi sloveso ({navData.irregularGer}){" "}
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</article>
	);
}
