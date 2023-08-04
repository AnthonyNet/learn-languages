import { type } from "os";

type Props = {
	createRandoms: ()=>void;
}
export default function Button({createRandoms}: Props) {

	return (
		<button
			className="absolute bottom-4  left-1/2 transform -translate-x-1/2  py-2 px-8  rounded-xl self-center text-center text-2xl font-bold hover:opacity-50  transition-opacity duration-700 ease-in-out __button_color  __text_color2"
			onClick={createRandoms}>
			Next
		</button>
	);
}