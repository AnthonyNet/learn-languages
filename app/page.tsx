"use client";

import "@/components/home/Home.css";
import SnowAnimation from "../components/home/SnowAnimation";
import Flying_objects from "@/components/home/Flying_objects";
import { motion } from "framer-motion";
import Arrow_down from "@/components/home/Arrow_down";
import Section2 from "@/components/home/Section2";


export default function MainPage() {
	return (
		<>
			{" "}
			<Flying_objects />
			<main className="relative grid grid-rows-8 w-full h-100-dvh items-center justify-center">
				<SnowAnimation />

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						delay: 1,
						duration: 3,
						ease: "easeOut",
					}}
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-8  cursor-pointer bg-[var(--color-main-accent)]  rounded-tl-3xl rounded-tr-md rounded-bl-md rounded-br-3xl  h-full w-full">
					<Section2 />
				</motion.div>
			</main>
			<div className="absolute -bottom-2 w-14 h-14 md:w-20 md:h-20  flex justify-center items-end animate-ping-slow">
				<a href="#section-2">
					<Arrow_down />
				</a>
			</div>
			<Section2 />
		</>
	);
}