"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

import { TiThMenu } from "react-icons/ti";
import Mobile__Nav from "./Mobile_nav";
import Nav_Items from "./Nav_items";
import Select from "./Select";
import "./Navbar.css";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


const styles = {
	nav: "flex justify-center items-center w-full  min-h-[10vh] shadow-xl z-[400] px-4 fixed max-w-[1280px] __background",
	nav__div: "w-full h-full flex items-start relative md:text-xl xl:text-3xl ",
	aside:
		"logo w-auto md:w-[35vw] lg:w-1/3 transition ease-in-out duration-1000 __nav-item",
	article: "justify-around items-start w-full h-full hidden md:flex ",
	container:
		"relative inline-block tooltip hover:text-white transition ease-in-out duration-700 font-extrabold",
	main__a:
		"transition ease-in-out duration-700 px-2 py-1 font-medium transform hover:-translate-y-6 ", //ulAnimation
	cover:
		"flex flex-col p-4 bg-white w-60 h-auto rounded-md z-20 absolute right-0 invisible tooltip-item ",
	ul: "list-disc space-y-2 ",
	ul__li: "flex items-start",
	ul__li__a:
		"font-bold text-sm text-gray-500 hover:text-sky-600 transition duration-700 ease-in-out transform",
} as const;

interface NavData {
	irregularEng: number;
	irregularGer: number;
	oxfordB2: number;
}

export default function Navbar() {
	const [navData, setNavData] = useState<null|NavData>(null);
	const [nav, setNav] = useState(false);
	const supabase = createClientComponentClient();

	useEffect(() => {
		const getData = async () => {
			const { data: irregular_eng } = await supabase.from("irregular_eng").select();
			const { data: irregular_ger } = await supabase.from("irregular_ger").select();
			const { data: oxford_b2 } = await supabase
				.from("oxford_b2")
				.select();
			if(irregular_eng && irregular_ger && oxford_b2){
				setNavData({irregularEng:irregular_eng.length, irregularGer:irregular_ger.length, oxfordB2:oxford_b2.length});
			}
		}
		getData();
	},[supabase, setNavData])

	const handleNav = () => {
		setNav(!nav);
	};

	return (
		<nav className={styles.nav}>
			<div className={styles.nav__div}>
				<aside className={styles.aside}>
					<Link
						href="/"
						className="text-2xl sm:text-3xl md:text-xl xl:text-3xl logo">
						Learn <strong className="">languages</strong>
					</Link>
				</aside>
				{navData && <Nav_Items navData={navData} />}

				<span className="hidden md:flex bottom-2 right-4 text-3xl">
					<Select />
				</span>

				<div className="text-4xl md:hidden ml-auto">
					<TiThMenu onClick={handleNav} />
				</div>
			</div>
			<Mobile__Nav nav={nav} handleNav={handleNav} navData={navData} />
		</nav>
	);
}
