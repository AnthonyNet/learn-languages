import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/app/components/ui/accordion";

export default function Items_oxford({selectValue, propsData}:any) {


	return (
		<Accordion
			type="single"
			collapsible
			className="rounded-lg pt-8 px-8 flex flex-col justify-center items-center grow ">
			<AccordionItem value="item-1">
				<AccordionTrigger>
					{propsData[0].sentence}
				</AccordionTrigger>
				<AccordionContent className="text-center">
					{propsData[0].cz_sentence}
				</AccordionContent>
			</AccordionItem>

			{selectValue === "2" && (
				<AccordionItem value="item-2">
					<AccordionTrigger>
						{propsData[1].sentence}
					</AccordionTrigger>
					<AccordionContent className="text-center">
						{propsData[1].cz_sentence}
					</AccordionContent>
				</AccordionItem>
			)}

			{selectValue === "3" && (
				<>
					<AccordionItem value="item-2">
						<AccordionTrigger>{propsData[2].sentence}</AccordionTrigger>
						<AccordionContent className="text-center">
							{propsData[2].cz_sentence}
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>{propsData[2].sentence}</AccordionTrigger>
						<AccordionContent className="text-center">
							{propsData[2].cz_sentence}
						</AccordionContent>
					</AccordionItem>
				</>
			)}
		</Accordion>
	);
}
