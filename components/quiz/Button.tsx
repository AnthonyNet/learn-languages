import clsx from "clsx";

interface Props {
	checkAnswer: (choice: any, index: number) => void;
	choice: any;
	verb: any;
	answerColor: string;
}

export default function Button({
	checkAnswer,
	choice,
	verb,
	answerColor,
}: Props) {
	const index = 0;
	return (
		<button
			onClick={() => checkAnswer(choice, index)}
			className={clsx(
				"text-white py-2 rounded-md shadow-md font-bold duration-300 text-main-secondary",
				answerColor,
				{
					"bg-green-500": choice.id === verb.id,
					"bg-red-500": choice.id !== verb.id,
				}
			)}>
			{choice.base}
		</button>
	);
}
