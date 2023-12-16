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
	button:
		"flex items-center justify-center  h-full w-full scale-90 hover:scale-100   opacity-100 cursor-pointer transition:scale ease-in-out delay-100 duration-1000",
	button__animation: " lg:hover:translate-x-[20px] ",
	flag__icon:
		"hover:rotate-90 transition ease-in-out duration-700 fixed  top-4  left-2  ring-2 rounded-full  drop-shadow-sm __background __gradient",
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
export default function Oxford({ props }: Props) {
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
				className="w-full max-w-[600px] h-full  md:max-h-[400px] lg:border-4  border-double px-4  rounded-lg  preserve-3d group my-rotate-y-180 duration-1000 flex flex-col  __border_color"
				animate={{ rotateY: switchSide ? 0 : 180 }}
				transition={{ duration: 0.5 }}>
				<RadioGroup
					className="fixed top-6 left-1/2 transform -translate-x-1/2 flex flex-row justify-center h-10"
					defaultValue="option-one">
					<div
						className="flex items-center space-x-2"
						onClick={() => {
							setDataTS(props[0]);
							setRand(Math.floor(Math.random() * props[0].length));
							setSwitchButton(false);
						}}>
						<RadioGroupItem value="option-one" id="option-one" />
						<Label htmlFor="option-one">B2</Label>
					</div>
					<div
						className="flex items-center space-x-2"
						onClick={() => {
							setDataTS(props[1]);
							setRand(Math.floor(Math.random() * props[1].length));
							setSwitchButton(true);
						}}>
						<RadioGroupItem value="option-two" id="option-two" />
						<Label htmlFor="option-two">C1</Label>
					</div>
				</RadioGroup>
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

				<div className="flex justify-around w-full h-[70px] items-center text-center md:border-t-2 __border_color">
					{switchSide && (
						<>
							<Button onClick={() => setSwitchSide(!switchSide)}>
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
