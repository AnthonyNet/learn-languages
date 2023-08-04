"use client";


import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import CloudDown from "../app/components/icons/CloudDown";
import Section2 from "./components/home/Section2";
import './components/home/Home.css';

const styles = {
	section: "grid grid-rows-8 w-full  h-100-dvh items-center justify-center",
	h1__cover:
		"py-8 row-start-4 row-end-6  cursor-pointer __gradient __text_shadow rounded-tl-3xl rounded-br-3xl -skew-x-12 pr-2",
	h1: "text-[35px] md:text-[60px] xl:text-[120px]  flex w-full h-full flex items-center ",
	bottom__container:
		"row-start-6 row-end-7 h-full w-full flex flex-col justify-end items-center text-sm  text-center md:text-2xl",
	h2: "text-sm md:text-2xl",
	icon__cover:
		"w-full h-full flex row-start-7 row-end-8 justify-center items-end motion-safe:animate-ping-slower",
} as const;

export default function MainPage() {
	return (
		<>
			<section className={styles.section}>
				<div></div>
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
				<div className={styles.bottom__container}>
					<h2 className={styles.h2}>Working in progress...</h2>
					<Typewriter
						options={{
							strings: [
								"React",
								"Next.js",
								"Tailwind CSS",
								"TypeScript",
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
			</section>

			<Section2 />
		</>
	);
}
