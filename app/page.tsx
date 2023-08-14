"use client"

import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import CloudDown from "@/components/icons/CloudDown";
import Section2 from "@/components/home/Section2";
import "@/components/home/Home.css";
import SnowAnimation from "./SnowAnimation";
import Image from "next/image";
import Earth from "@/images/planet-earth.png";

const styles = {
	section:
		"relative grid grid-rows-8 w-full h-100-dvh items-center justify-center ",
	h1__cover:
		"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-8 border-4 border-double  __gradient  rounded-tl-3xl rounded-tr-md rounded-bl-md rounded-br-3xl -skew-x-12 pr-2 __logo_main opacity-50 __border_color",
	h1: "text-[35px] md:text-[60px] xl:text-[120px] flex w-full h-full flex items-center justify-center __h1", // Center text
	bottom__container:
		"absolute bottom-10 w-auto flex flex-col justify-center items-center text-base text-center md:text-2xl p-8 bg-black", // Added padding
	h2: "text-sm md:text-2xl",
	icon__cover:
		"absolute -bottom-2 w-14 h-14 md:w-20 md:h-20  flex justify-center items-end animate-ping-slow", // Added padding
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
						<span className="w-[750px] md:w-[1100px] xl:w-[1200px] 2xl:w-[1500px] z-[-1] absolute top-1/2 left-1/2 __logo-icon-container animate-orbit xl:animate-orbit-slower  transform origin-[80%] [50%]">
							<span className="logo-icon opacity-30">
								<Image
									src={Earth}
									alt="Picture of the earth"
									sizes="70vw"
									loading="lazy"
									className="w-[70vw] md:w-[40vw] xl:w-[30vw] 2xl:w-[15vw]  rounded-full __box_shadow_color"
								/>
							</span>
						</span>
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
