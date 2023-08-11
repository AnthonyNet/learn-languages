"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

import { TiThMenu } from "react-icons/ti";
import Mobile__Nav from "./Mobile_nav";
import Nav_Items from "./Nav_items";
import Select from "./Select";
import "./Navbar.css";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface NavData {
	irregularEng: number;
	irregularGer: number;
	oxfordB2: number;
	phrasal: number;
}

export default function Navbar() {
	const [navData, setNavData] = useState<null|NavData>(null);
	const [nav, setNav] = useState<boolean>(false);
	const supabase = createClientComponentClient();

	useEffect(() => {
		const getData = async () => {
			const { data: irregular_eng } = await supabase.from("irregular_eng").select();
			const { data: irregular_ger } = await supabase.from("irregular_ger").select();
			const { data: phrasal_verbs } = await supabase
				.from("irregular_ger")
				.select();
			const { data: oxford_b2 } = await supabase
				.from("oxford_b2")
				.select();
			if(irregular_eng && irregular_ger && oxford_b2 && phrasal_verbs) {
				setNavData({irregularEng:irregular_eng.length, irregularGer:irregular_ger.length, phrasal: phrasal_verbs.length, oxfordB2:oxford_b2.length});
			}
		}
		getData();
	},[supabase, setNavData])

	const handleNav = () => {
		setNav(!nav);
	};

	return (
		<nav className="flex justify-center items-center w-full  h-[50px] md:h-[70px] shadow-xl z-[400] px-4 fixed max-w-[1280px] __background">
			<div className="w-full h-full flex items-center relative md:text-xl xl:text-3xl ">
				<aside className="logo w-auto md:w-[35vw] lg:w-1/3 transition ease-in-out   __nav-item">
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
