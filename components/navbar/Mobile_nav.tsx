
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import Mobile_items from "./Mobile_items";

const styles = {
	main__open: "snap-x z-10  fixed left-0 top-0 w-full h-screen  bg-black/70",
	main__close: "z-0",
	main__div__open:
		"responsiveMenu fixed left-0 top-0 w-[85%] sm:w-[60%] md:w-[45%] h-screen mobile__Nav p-4 sm:p-8 ease-in duration-700 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200 border-r-2 __border_color",
	main__div__close:
		"fixed top-10 left-[-100%] ease-in duration-500 mobile__Nav",
	main__header: "flex justify-between items-center",
	main__header__aside: "logo sm:mr-40",
	main__header__closeBtn:
		"navClose rounded-full  p-3 __box_shadow_color ring-1 shadow-md cursor-pointer ",
	main__div__div: "mottoCover border-b border-gray-300 my-4 text-sm sm:text-lg",
};

interface Mobile {
	nav: boolean;
	handleNav: () => void;
	navData: null | {
		readonly irregularEng: number;
		readonly irregularGer: number;
		readonly oxfordC1: number;
		readonly phrasal: number;
		readonly ger_verbs: number;
	};
}

function Mobile_nav({ nav, handleNav, navData }: Mobile) {
	return (
		<main className={nav ? styles.main__open : styles.main__close}>
			<div className={nav ? styles.main__div__open : styles.main__div__close}>
				<header className={styles.main__header}>
					<aside className={styles.main__header__aside}>
						<Link href="/">
							Learn <strong>languages</strong>
						</Link>
					</aside>
					<div onClick={handleNav} className={styles.main__header__closeBtn}>
						<CgClose />
					</div>
				</header>
				<div className={styles.main__div__div}>
					<p>Evolution means everyday learning</p>
				</div>

				{navData&&<Mobile_items handleNav={handleNav} navData={navData} />}
			</div>
		</main>
	);
}

export default Mobile_nav;
