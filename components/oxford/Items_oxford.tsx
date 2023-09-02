import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
interface DataTS {
		readonly id: string;
		readonly word: string;
		readonly sentence: string;
		readonly cz_word: string;
		readonly cz_sentence: string;
	}

export default function Items_oxford({selectValue, propsData}:{selectValue: string, propsData: DataTS[] | any}) {


	return (
		<Accordion
			type="single"
			collapsible
			className="rounded-lg px-2 md:px-8 flex flex-col justify-center items-center grow md:text-[140%] xl:text-[120%]">
			<AccordionItem value="item-1">
				<AccordionTrigger>{propsData[0].sentence}</AccordionTrigger>
				<AccordionContent className="text-center md:text-[80%]">
					{propsData[0].cz_sentence}
				</AccordionContent>
			</AccordionItem>

			{selectValue === "2" && (
				<AccordionItem value="item-2">
					<AccordionTrigger>{propsData[1].sentence}</AccordionTrigger>
					<AccordionContent className="text-center md:text-[80%]">
						{propsData[1].cz_sentence}
					</AccordionContent>
				</AccordionItem>
			)}

			{selectValue === "3" && (
				<>
					<AccordionItem value="item-2">
						<AccordionTrigger>{propsData[1].sentence}</AccordionTrigger>
						<AccordionContent className="text-center md:text-[80%]">
							{propsData[1].cz_sentence}
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>{propsData[2].sentence}</AccordionTrigger>
						<AccordionContent className="text-center md:text-[80%]">
							{propsData[2].cz_sentence}
						</AccordionContent>
					</AccordionItem>
				</>
			)}
		</Accordion>
	);
}
