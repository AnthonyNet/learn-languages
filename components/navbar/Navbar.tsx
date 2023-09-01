"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import { TiThMenu } from "react-icons/ti";
import Mobile__Nav from "./Mobile_nav";
import Nav_Items from "./Nav_items";
import { NavData } from "@/interface/navdata";
import "./Navbar.css";
export const revalidate = 3600; // revalidate the data at most every hour

interface Props {
	props: NavData;
}

export default  function Navbar({props}: Props) {
	console.log("TS dbData problem in App/Memory/eng&ger, <ANY>");
	console.log("components/TopMenu TS DATA | null |undefined needs fix");
	console.log('LOG location in Navbar');

	const [navData, setNavData] = useState<null|NavData>(props);
	const [nav, setNav] = useState<boolean>(false);

	const handleNav = () => {
		setNav(!nav);
	};

	return (
		<nav className="flex justify-center items-center w-full  h-[50px] md:h-[70px] shadow-xl z-[40] px-4 fixed max-w-[1280px] ">
			<div className="w-full h-full flex items-center relative md:text-xl xl:text-3xl ">
				<aside className="w-auto md:w-[35vw] lg:w-1/3 transition ease-in-out">
					<Link
						href="/"
						className="text-2xl sm:text-3xl md:text-xl xl:text-3xl ">
							<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						delay: 1,
						duration: 3,
						ease: "easeOut",
					}}
					className=" border-4 border-double  __gradient  rounded-tl-xl rounded-tr-md rounded-bl-md rounded-br-xl -skew-x-12  __border_color cursor-pointer opacity-50">
						<h1 className="flex items-center justify-center md:py-3  __h1  ">
						Learn <strong className="pl-2">languages</strong>
						</h1>
						</motion.div>
					</Link>
				</aside>
				{navData && <Nav_Items navData={navData} />}

				<div className="text-4xl md:hidden ml-auto">
					<TiThMenu onClick={handleNav} />
				</div>
			</div>
			<Mobile__Nav nav={nav} handleNav={handleNav} navData={navData} />
		</nav>
	);
}
