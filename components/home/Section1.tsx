"use client";
import "./Home.css";
import { motion } from "framer-motion";
import Image from "next/image";
import Irregular from "@/images/irregular.gif";
import Memory from "@/images/memory-x.gif";
import Search from "@/images/search.gif";
import Pagination from "@/images/pagination.gif";
import ArrowDown from "@/components/home/Arrow_down";
import Typewriter from "typewriter-effect";

const styles = {
	section:
		"pt-[50px] bg-transparent w-full flex flex-col xl:flex-row items-center justify-center",
	div_left:
		"h-screen max-w-4xl mx-auto text-center flex flex-col justify-center text- gap-4 px-8 xl:p-0",
	div_right:
		"w-full h-auto  min-h-[800px] xl:h-[80%] max-w-xl mx-auto rounded-lg shadow-lg py-8    __my_grid",
	image_cover: "relative  __my_grid_item rounded-[30px] ",
	image:
		"border-4 border-double rounded-[30px] border-blue-700 hover:scale-[102%] transition-all duration-500 ease-in-out bg-black overflow-hidden hue-rotate-[var(--hue-rotate)] brightness-[var(--saturation)]",
};

export default function Section1() {
	return (
		<div className={styles.section}>
			<div className={styles.div_left}>
				<h2 className="text-4xl font-bold __h1">Vítej na Learn Languages</h2>
				<p className="text-xl ">Objev moc slovní zásoby</p>
				<p className="text-xl">
					Rychle a snadno se nauč nová slovíčka prostřednictvím jednoduché a
					interaktivní platformy
				</p>
				<p className="mt-4">
					Čekají na tebe lekce, poutavá cvičení a spousta dalšího materiálu.
					Začni svou jazykovou cestu ještě dnes bez registrace a zcela ZDARMA!
				</p>
				<h2 className="text-sm md:text-2xl">Working in progress...</h2>
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
				<div className="mt-8 flex justify-center items-end animate-ping-slow">
					<a href="#section-2">
						<ArrowDown />
					</a>
				</div>
			</div>

			<div className={styles.div_right}>
				<div
					className={
						styles.image_cover +
						" sm:row-span-6 sm:col-span-6 sm:row-start-4 sm:row-end-10 sm:col-start-7 sm:col-end-13 sm:z-30  overflow-hidden hover:scale-[102%] transition-all duration-500 ease-in-out"
					}>
					<Image
						src={Irregular}
						alt="irregular-gif"
						fill={true}
						className={
							"border-4 border-double rounded-[30px] border-blue-700  transition-all duration-500 ease-in-out scale-y-[115%] scale-x-[118%] pr-1 h-20 hue-rotate-[var(--hue-rotate)] brightness-[var(--saturation)]"
						}
					/>
				</div>
				<div
					className={
						styles.image_cover +
						" row-start-3 row-end-7 col-start-1 col-end-9  z-20"
					}>
					<Image
						src={Memory}
						alt="memory-gif"
						fill={true}
						className={styles.image + " rounded-[30px] p-2"}
					/>
				</div>
				<div
					className={
						styles.image_cover +
						" row-span-5  row-start-7 row-end-13 col-start-1 col-end-12  z-10 sm:mt-[5vh]"
					}>
					<Image
						src={Pagination}
						alt="pagination-gif"
						fill={true}
						className={styles.image + " sm:rounded-bl-[120px]"}
					/>
				</div>
				<div
					className={
						styles.image_cover +
						" row-span-4 row-start-1 row-end-5 col-start-5 col-end-13  sm:rounded-br-[500px] sm:mr-8"
					}>
					<Image
						src={Search}
						alt="irregular-gif"
						fill={true}
						className={styles.image + " sm:rounded-tr-[120px]"}
					/>
				</div>
			</div>
		</div>
	);
}
