"use client";

import "@/components/home/Home.css";
import SnowAnimation from "../components/home/SnowAnimation";
import Flying_objects from "@/components/home/Flying_objects";
import { motion } from "framer-motion";
import Section1 from "@/components/home/Section1";

export default function MainPage() {
	return (
		<>
			{" "}
			<Flying_objects />
			<main className="relative grid w-full h-100-dvh items-center justify-center">
				<SnowAnimation />

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						delay: 1,
						duration: 3,
						ease: "easeOut",
					}}
					className="absolute  rounded-tl-3xl rounded-tr-md rounded-bl-md rounded-br-3xl  h-full   w-full">
					<Section1 />
				</motion.div>
			</main>
		</>
	);
}
