"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { useState, useEffect } from "react";
import Button from "../button/Button";
import { RxArrowRight } from "react-icons/rx";
import Items_oxford from "./Items_oxford";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const styles = {
	button:
		"flex items-center justify-center  h-full w-full scale-90 hover:scale-100   opacity-100 cursor-pointer transition:scale ease-in-out delay-100 duration-1000",
	button__animation: " lg:hover:translate-x-[20px] ",
};
interface DataTS {
	readonly id: string;
	readonly word: string;
	readonly sentence: string;
	readonly cz_word: string;
	readonly cz_sentence: string;
	readonly length: number;
}

interface Randoms {
	[index: number]: DataTS[];
}
export default function Oxford({ props }: { props: DataTS[] | any }) {
	const [start, setStart] = useState<boolean>(false);
	const [dataTS, setDataTS] = useState<DataTS | []>([]);
	const [propsData, setPropsData] = useState<Randoms>([]);
	const [selectValue, setSelectValue] = useState<string>("3");

	function createRandoms(dataTS: Randoms | any): void {
		const myLength = Object.keys(dataTS).length;
		const data = [
			dataTS[Math.floor(Math.random() * myLength)],
			dataTS[Math.floor(Math.random() * myLength)],
			dataTS[Math.floor(Math.random() * myLength)],
		];
		setPropsData(data);
	}

	useEffect(() => {
		const getData = async () => {
			const data = await props;
			setDataTS(data[1]);
			createRandoms(data[1]);
			setStart(true);
		};
		getData();
	}, []);
	const handleSelectChange = (selectValue: string) => {
		setSelectValue(selectValue);
	};

	return (
		<section className="w-screen flex flex-col items-center justify-center pt-[50px] md:pt-[70px] h-100-dvh  min-h-[330px] ">
			<main className="w-full h-full md:w-auto  md:max-h-[400px] lg:border-4 border-double flex flex-col justify-center lg:justify-around rounded-3xl border-main relative">
				<RadioGroup
					className="flex flex-row justify-center h-10"
					defaultValue="option-one">
					<div
						className="flex items-center space-x-2"
						onClick={() => {
							setDataTS(props[0]);
							createRandoms(props[0]);
						}}>
						<RadioGroupItem value="option-one" id="option-one" />
						<Label htmlFor="option-one">B2</Label>
					</div>
					<div
						className="flex items-center space-x-2"
						onClick={() => {
							setDataTS(props[1]);
							createRandoms(props[1]);
						}}>
						<RadioGroupItem value="option-two" id="option-two" />
						<Label htmlFor="option-two">C1</Label>
					</div>
				</RadioGroup>
				<Select onValueChange={handleSelectChange}>
					<SelectTrigger className="fixed top-12 md:top-20 lg:top-2 md:left-2 ml-2 lg:absolute w-[110px] border-2 border-main">
						<SelectValue placeholder="Počet vět" />
					</SelectTrigger>
					<SelectContent className={"bg-black text-main border-main"}>
						<SelectItem value="1">1 / karta</SelectItem>
						<SelectItem value="2">2 / karta</SelectItem>
						<SelectItem value="3">3 / karta</SelectItem>
					</SelectContent>
				</Select>

				{start && (
					<Items_oxford propsData={propsData} selectValue={selectValue} />
				)}

				<footer className="flex justify-around w-full h-[70px] items-center text-center  border-main">
					<Button onClick={() => createRandoms(dataTS)}>
						<RxArrowRight
							className={styles.button + " " + styles.button__animation}
						/>
					</Button>
				</footer>
			</main>
		</section>
	);
}
