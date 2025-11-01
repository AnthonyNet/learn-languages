"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import { TbZoomQuestion } from "react-icons/tb";
import { RxArrowRight } from "react-icons/rx";
import Button from "@/components/button/Button";
import { motion } from "framer-motion";

//FLAGS images
import czFlag from "@/images/cz.png";
import enFlag from "@/images/eng.png";
import Text_Card from "./Text_card";
import Card_Back from "./Card_back";
import { Data2 } from "@/interface/Props";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const styles = {
	button_icon:
		"flex items-center justify-center w-full h-8 hover:scale-100  opacity-100 cursor-pointer transition:scale ease-in-out delay-100 duration-1000",
	button__animation: " lg:hover:translate-x-[20px] ",
	flag__icon:
		"hover:rotate-90 transition ease-in-out duration-700 fixed  top-4  left-2  ring-2 rounded-full  drop-shadow-sm  __gradient",
};

interface Props {
	props: { [index: number]: Data2[] };
}

interface Data {
	readonly word: string;
	readonly sentence: string;
	readonly cz_word: string;
	readonly cz_sentence: string;
}
export default function FlipCard({ props }: Props) {
	const [start, setStart] = useState<boolean>(false);
	const [rand, setRand] = useState<number>(Math.floor(Math.random() * 50));
	const [dataTS, setDataTS] = useState<Data[] | []>([]);
	const [switchButton, setSwitchButton] = useState<boolean>(true);
	const [switchSide, setSwitchSide] = useState<boolean>(true);
	const [switchLanguage, setSwitchLanguage] = useState<boolean>(true);

	async function createRandoms(): Promise<void> {
		const data = await dataTS;
		setRand(Math.floor(Math.random() * data.length));
	}
	const getData = async (): Promise<void> => {
		const propsData = await props;
		setDataTS(propsData[0]);
		createRandoms();
		setStart(true);
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1 }}
			className="relative pt-[40px] md:pt-[70px] md:text-[130%]  w-screen  flex flex-col justify-center items-center  h-100-dvh">
			<motion.div
				className="w-full max-w-[600px] h-full  md:max-h-[400px] lg:border-4  border-double px-4  rounded-lg  preserve-3d group my-rotate-y-180 duration-1000 flex flex-col  border-main"
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
						cz_word={dataTS[rand].cz_word}
						cz_sentence={dataTS[rand].cz_sentence}
					/>
				)}

				<div className="flex justify-around w-full h-[70px] items-center text-center md:border-t-2 border-main">
					{switchSide && (
						<>
							<Button onClick={() => setSwitchSide(!switchSide)} description={"Odpověď"}>
								<TbZoomQuestion className={styles.button_icon} />
							</Button>

							<Button onClick={createRandoms} description={"Další"}>
								<RxArrowRight
									className={styles.button_icon + " " + styles.button__animation}
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
							cz_word: dataTS[rand].cz_word,
							cz_sentence: dataTS[rand].cz_sentence,
							stylesProp: styles.button + " " + styles.button__animation,
						}}
					/>
				)}
			</motion.div>
		</motion.section>
	);
}
