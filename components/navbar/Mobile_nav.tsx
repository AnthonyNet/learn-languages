import Link from "next/link";
import { CgClose } from "react-icons/cg";
import Mobile_items from "./Mobile_items";
import { NavData } from "@/interface/navdata";
import clsx from "clsx";

const styles = {
	main: {
		open: "snap-x z-10  fixed left-0 top-0 w-full h-screen  bg-black/70",
		close: "z-0",
	},
	section: {
		open: "responsiveMenu fixed left-0 top-0 w-[85%] sm:w-[60%] md:w-[45%] h-screen bg-black p-4 sm:p-8 ease-in duration-700 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200 border-r-2 border-main",
		close: "fixed top-10 left-[-100%] ease-in duration-500 bg-black",
	},
};

interface Mobile {
	nav: boolean;
	handleNav: () => void;
	navData: null | NavData;
}

function Mobile_nav({ nav, handleNav, navData }: Mobile) {
	return (
		<main className={clsx(nav ? styles.main.open : styles.main.close)}>
			<section
				className={clsx(nav ? styles.section.open : styles.section.close)}>
				<header className="flex justify-between items-center">
					<aside className="logo sm:mr-40">
						<Link href="/">
							Learn <strong>languages</strong>
						</Link>
					</aside>
					<div
						onClick={handleNav}
						className="navClose rounded-full  p-3 __box_shadow_color ring-1 shadow-md cursor-pointer">
						<CgClose />
					</div>
				</header>
				<div className="border-b border-gray-300 my-4 text-sm sm:text-lg">
					<p>Evolution means everyday learning</p>
				</div>

				{navData && <Mobile_items handleNav={handleNav} navData={navData} />}
			</section>
		</main>
	);
}

export default Mobile_nav;
