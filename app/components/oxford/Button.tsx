import { type } from "os";

type Props = {
	createRandoms: ()=>void;
}
export default function Button({createRandoms}: Props) {

	return <button className="py-2 px-8 __gradient rounded-xl self-center text-center text-2xl font-bold hover:opacity-50  transition-opacity duration-700 ease-in-out" onClick={createRandoms}>Next</button>;
}