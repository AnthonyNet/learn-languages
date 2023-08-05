"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import { TbZoomQuestion } from "react-icons/tb";
import { RxArrowRight } from "react-icons/rx";
import Button from "@/app/components/button/Button";
import { motion } from "framer-motion";
//FLAGS images
import czFlag from "@/myData/images/cz.png";
import enFlag from "@/myData/images/eng.png";
import Text_Card from "./Text_card";
import Card_Back from "./Card_back";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
{
	/*
  This Card component is used in OXford B1, B2, C1 & Göethe
  */
}

const styles = {
	section:
		"relative w-full h-100-dvh  flex justify-center items-center p-2 sm:p-0 responsiveSection",
	card__container:
		"w-full h-[50vh] mt-10-[vh] max-w-[600px] h-[280px] md:max-h-[400px] border-8  border-double px-4  rounded-lg  preserve-3d group my-rotate-y-180 duration-1000 flex flex-col  __border_color __css_small_height_index_container",
	card__btn__container:
		"flex justify-around w-full h-[70px] items-center text-center border-t-2 __border_color",
	h3: "py-2 md:py-4  text-center border-b  w-auto mx-auto __border_color",
	button__cover:
		"relative rounded  w-[90px] h-14 text-2xl font-extrabold  opacity-100 cursor-pointer __button_color  __text_color2",
	button:
		"flex items-center justify-center  h-full w-full scale-90 hover:scale-100   opacity-100 cursor-pointer transition:scale ease-in-out delay-100 duration-1000",
	button__animation:
		" hover:translate-x-[20px] ",
	flag__icon:
		"hover:rotate-90 transition ease-in-out duration-700 fixed top-2 left-2  ring-2 rounded-full  drop-shadow-sm __background __gradient",
};

interface Props  {
	id: string;
}
const Card = () => {
	const supabase = createClientComponentClient();
	const [start, setStart] = useState<boolean>(false);
	const [rand, setRand] = useState<any>({});
	const [dataTS, setDataTS] = useState<any>([]);
	const [switchSide, setSwitchSide] = useState<boolean>(true);
	const [switchLanguage, setSwitchLanguage] = useState<boolean>(true);

async function createRandoms(): Promise<void> {
	const data = await dataTS;
	setRand(Math.floor(Math.random() * data.length));
}
const getData = async (): Promise<void> => {
	try {
		const { data: oxford_b2 } = await supabase.from("oxford_b2").select();
		if (oxford_b2) {
			setDataTS(oxford_b2);
			createRandoms();
			setStart(true);
		}
	} catch (error) {
		console.error("Error in getData:", error);
		throw error;
	}
};
useEffect(() => {
	getData();
}, [supabase, setDataTS]);


	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1 }}
			className={styles.section}>
			<motion.div
				className={styles.card__container}
				animate={{ rotateY: switchSide ? 0 : 180 }}
				transition={{ duration: 0.5 }}>
				{switchSide && (
					<button onClick={() => [setSwitchLanguage(!switchLanguage)]}>
						{switchLanguage ? (
							<Image className={styles.flag__icon} src={czFlag} alt="cz-flag" />
						) : (
							<Image
								className={styles.flag__icon}
								src={enFlag}
								alt="eng-flag"
							/>
						)}
					</button>
				)}
				{start && (
					<Text_Card
						switchLanguage={switchLanguage}
						word={dataTS[rand].word}
						sentence={dataTS[rand].sentence}
						cz_sentence={dataTS[rand].cz_sentence}
					/>
				)}

				<div className={styles.card__btn__container}>
					{switchSide && (
						<>

							<Button onClick={() =>setSwitchSide(!switchSide)}>
								<TbZoomQuestion className={styles.button} />
							</Button>

							<Button onClick={createRandoms}>
								<RxArrowRight
									className={styles.button + " " + styles.button__animation}
								/>
							</Button>
						</>
					)}
				</div>
				{start && (
					<Card_Back
						props={{
							switchSide,
							setSwitchSide,
							switchLanguage,
							word: dataTS[rand].word,
							sentence: dataTS[rand].sentence,
							cz_sentence: dataTS[rand].cz_sentence,
							stylesProp: styles.button + " " + styles.button__animation,
						}}
					/>
				)}
			</motion.div>
		</motion.section>
	);
};

export default Card;
