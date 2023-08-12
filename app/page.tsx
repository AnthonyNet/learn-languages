"use client"

import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import CloudDown from "@/components/icons/CloudDown";
import Section2 from "@/components/home/Section2";
import "@/components/home/Home.css";
import SnowAnimation from "./SnowAnimation";

const styles = {
	section:
		"relative grid grid-rows-8 w-full h-100-dvh items-center justify-center",
	h1__cover:
		"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-8 cursor-pointer __gradient __text_shadow rounded-tl-3xl rounded-br-3xl -skew-x-12 pr-2",
	h1: "text-[35px] md:text-[60px] xl:text-[120px] flex w-full h-full flex items-center justify-center", // Center text
	bottom__container:
		"absolute bottom-28 w-full flex flex-col justify-center items-center text-base text-center md:text-2xl p-8", // Added padding
	h2: "text-sm md:text-2xl",
	icon__cover: "absolute bottom-0 w-full flex justify-center items-end p-8 animate-ping-slow", // Added padding
} as const;

export default function MainPage() {
	return (
		<>
			<section className={styles.section}>
				<SnowAnimation />
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						delay: 1,
						duration: 3,
						ease: "easeOut",
					}}
					className={styles.h1__cover}>
					<h1 className={styles.h1}>
						Learn <strong className="pl-2">languages</strong>
					</h1>
				</motion.div>
			</section>
			<div className={styles.bottom__container}>
				<h2 className={styles.h2}>Working in progress...</h2>
				<Typewriter
					options={{
						strings: [
							"Next.js",
							"TypeScript",
							"Supabase",
							"React",
							"Tailwind CSS",
							"HTML5",
							"CSS3",
						],
						autoStart: true,
						loop: true,
					}}
				/>
			</div>
			<div className={styles.icon__cover}>
				<a href="#section-2">
					<CloudDown />
				</a>
			</div>
			<Section2 />
		</>
	);
}
