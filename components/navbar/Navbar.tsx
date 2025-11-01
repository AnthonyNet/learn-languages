"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TiThMenu } from "react-icons/ti";
import Mobile__Nav from "./Mobile_nav";
import Nav_Items from "./Nav_items";
import { NavData } from "@/interface/navdata";
import "./Navbar.css";
export const revalidate = 3600; // revalidate the data at most every hour

interface Props {
	props: NavData;
}

export default function Navbar({ props }: Props) {
	console.log("TS dbData problem in App/Memory/eng&ger, <ANY>");
	console.log("components/TopMenu TS DATA | null |undefined needs fix");
	console.log("LOG location in Navbar");

	const [navData, setNavData] = useState<null | NavData>(props);
	const [nav, setNav] = useState<boolean>(false);

	const handleNav = () => {
		setNav(!nav);
	};

	return (
		<nav className="flex justify-center items-center w-full  h-[50px] lg:h-[70px] shadow-xl z-[40] px-4 fixed max-w-[1280px] bg-main-black border border-red-500">
			<div className="w-full h-full flex items-center relative lg:text-xl xl:text-3xl ">
				<aside className="w-auto lg:w-[35vw] xl:w-1/3 transition ease-in-out">
					<Link
						href="/"
						className="text-2xl sm:text-3xl lg:text-xl xl:text-3xl ">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								delay: 1,
								duration: 3,
								ease: "easeOut",
							}}
							className="cursor-pointer">
							<h1 className="transform font-bold relative text-transparent bg-clip-text __text_shadow">
								<span className="text-main hue-rotate-15 brightness-125">
									Learn
								</span>{" "}
								<strong className="text-indigo-200">languages</strong>
							</h1>
						</motion.div>
					</Link>
				</aside>
				{navData && <Nav_Items navData={navData} />}

				<div className="text-4xl lg:hidden ml-auto">
					<TiThMenu onClick={handleNav} />
				</div>
			</div>
			<Mobile__Nav nav={nav} handleNav={handleNav} navData={navData} />
		</nav>
	);
}
