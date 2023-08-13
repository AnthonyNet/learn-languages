interface Props {
	checkAnswer: (choice: any, index: number) => void;
	choice: any;
	verb: any;
	answerColor: string;
}

export default function Button({checkAnswer, choice, verb, answerColor}: Props) {
	const index = 0;
	return (
		<button
			onClick={() => checkAnswer(choice, index)}
			className={
				"text-white py-2 rounded-md shadow-md font-bold duration-300  __text_color2  " +
				answerColor +
				(choice.id === verb.id ? "bg-green-500" : "bg-red-500")
			}>
			{choice.base}
		</button>
	);
}