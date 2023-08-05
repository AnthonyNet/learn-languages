"use client"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/app/components/ui/accordion";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Button from "../button/Button";
import { RxArrowRight } from "react-icons/rx";

const styles = {
	card__btn__container:
		"flex justify-around w-full h-[70px] items-center text-center  __border_color",
	button__cover:
		"relative rounded  w-[90px] h-14 text-2xl font-extrabold  opacity-100 cursor-pointer __button_color  __text_color2",
	button:
		"flex items-center justify-center  h-full w-full scale-90 hover:scale-100   opacity-100 cursor-pointer transition:scale ease-in-out delay-100 duration-1000",
	button__animation: " hover:translate-x-[20px] ",
};

export default function Oxford() {
	const supabase = createClientComponentClient();
	const [start, setStart] = useState<boolean>(false);
	const [rand, setRand] = useState<any>({});
	const [dataTS, setDataTS] = useState<any>([]);
	const [selectValue, setSelectValue] = useState<string>("3");

async function createRandoms(): Promise<void> {
	const data = await dataTS;
	setRand({
		number1: Math.floor(Math.random() * data.length),
		number2: Math.floor(Math.random() * data.length),
		number3: Math.floor(Math.random() * data.length),
	});
}
	const getData = async (): Promise<void> => {
		try {
			const { data: oxford_b2} = await supabase
				.from("oxford_b2")
				.select();
			if (oxford_b2) {
				setDataTS(oxford_b2);
				createRandoms()
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
	const handleSelectChange = (selectValue: string) => {
		setSelectValue(selectValue);
	};


	return (
		<section className="w-screen h-screen flex items-center justify-center ">
			<div className="w-[400px] h-[450px] border-4 border-double flex flex-col justify-around rounded-3xl __border_color relative">
				<Select onValueChange={handleSelectChange}>
					<SelectTrigger className="absolute top-2 right-2 w-[180px] border-2 __border_color">
						<SelectValue placeholder="Items number" />
					</SelectTrigger>
					<SelectContent className="__background __text_color __border_color">
						<SelectItem value="1">1 per card</SelectItem>
						<SelectItem value="2">2 per card</SelectItem>
						<SelectItem value="3">3 per card</SelectItem>
					</SelectContent>
				</Select>

				<Accordion
					type="single"
					collapsible
					className="rounded-lg p-8 flex flex-col justify-center items-center grow ">
					<AccordionItem value="item-1">
						<AccordionTrigger>
							{start && dataTS[rand.number1].sentence}
						</AccordionTrigger>
						<AccordionContent className="text-center">
							{start && dataTS[rand.number1].cz_sentence}
						</AccordionContent>
					</AccordionItem>

					{selectValue === "2" && (
						<AccordionItem value="item-2">
							<AccordionTrigger>
								{start && dataTS[rand.number2].sentence}
							</AccordionTrigger>
							<AccordionContent className="text-center">
								{start && dataTS[rand.number2].cz_sentence}
							</AccordionContent>
						</AccordionItem>
					)}

					{selectValue === "3" && (
						<>
							<AccordionItem value="item-2">
								<AccordionTrigger>
									{start && dataTS[rand.number2].sentence}
								</AccordionTrigger>
								<AccordionContent className="text-center">
									{start && dataTS[rand.number2].cz_sentence}
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>
									{start && dataTS[rand.number3].sentence}
								</AccordionTrigger>
								<AccordionContent className="text-center">
									{start && dataTS[rand.number3].cz_sentence}
								</AccordionContent>
							</AccordionItem>
						</>
					)}
				</Accordion>
				<div className={styles.card__btn__container}>
					<Button onClick={createRandoms}>
						<RxArrowRight
							className={styles.button + " " + styles.button__animation}
						/>
					</Button>
				</div>
			</div>
		</section>
	);
}
