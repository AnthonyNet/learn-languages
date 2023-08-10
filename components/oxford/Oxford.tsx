"use client"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Button from "../button/Button";
import { RxArrowRight } from "react-icons/rx";
import Items_oxford from './Items_oxford';

const styles = {
	card__btn__container:
		"flex justify-around w-full h-[70px] items-center text-center  __border_color ",
	button__cover:
		"relative rounded  w-[90px] h-14 text-2xl font-extrabold  opacity-100 cursor-pointer __button_color  __text_color2",
	button:
		"flex items-center justify-center  h-full w-full scale-90 hover:scale-100   opacity-100 cursor-pointer transition:scale ease-in-out delay-100 duration-1000",
	button__animation: " lg:hover:translate-x-[20px] ",
};

export default function Oxford() {
	const supabase = createClientComponentClient();
	const [start, setStart] = useState<boolean>(false);
	const [dataTS, setDataTS] = useState<[]|DataTS[]>([]);
	const [propsData, setPropsData] = useState<[]|DataTS[]>([]);
	const [selectValue, setSelectValue] = useState<string>("3");

	interface DataTS{
		readonly id: string,
		readonly word: string,
		readonly sentence: string,
		readonly cz_sentence: string
	}
 function createRandoms(dataTS:DataTS[]):void{
	setPropsData([
		dataTS[Math.floor(Math.random() * dataTS.length)],
		dataTS[Math.floor(Math.random() * dataTS.length)],
		dataTS[Math.floor(Math.random() * dataTS.length)],
	]);
}
	const getData = async (): Promise<void> => {
		try {
			const { data: oxford_b2} = await supabase
				.from("oxford_b2")
				.select();
			if (oxford_b2) {
				setDataTS(oxford_b2);
				createRandoms(oxford_b2);
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
		<section className="w-screen flex flex-col items-center justify-center pt-[50px] md:pt-[70px] h-100-dvh   __accordion">
			<div className="w-full h-full md:w-auto  md:max-h-[400px] lg:border-4 border-double flex flex-col justify-center lg:justify-around rounded-3xl __border_color relative">
				<Select onValueChange={handleSelectChange}>
					<SelectTrigger className="flex ml-2 lg:absolute w-[180px] border-2 __border_color">
						<SelectValue placeholder="Počet vět" />
					</SelectTrigger>
					<SelectContent className={"__background __text_color __border_color"}>
						<SelectItem value="1">1 / karta</SelectItem>
						<SelectItem value="2">2 / karta</SelectItem>
						<SelectItem value="3">3 / karta</SelectItem>
					</SelectContent>
				</Select>

				{start && (
					<Items_oxford
						start={start}
						propsData={propsData}
						selectValue={selectValue}
					/>
				)}

				<div className={styles.card__btn__container}>
					<Button onClick={() => createRandoms(dataTS)}>
						<RxArrowRight
							className={styles.button + " " + styles.button__animation}
						/>
					</Button>
				</div>
			</div>
		</section>
	);
}
