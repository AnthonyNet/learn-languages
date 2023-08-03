"use client"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Button from "./Button";

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
			<div className="w-[400px] h-[450px] border-2 flex flex-col justify-around rounded-3xl __border_color relative">
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
					className="rounded-lg p-8 flex flex-col justify-center items-center">
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
				<Button createRandoms={createRandoms} />
			</div>
		</section>
	);
}
