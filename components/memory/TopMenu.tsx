import {Data1, Data2} from "@/interface/Irregular";

interface Props {
	createData: Function;
	setDataTS: Function;
	data1: Data1[];
	data2: Data2[];
}

export default function TopMenu({ createData, setDataTS, data1, data2 }: Props) {
	return (
		<header className="w-full max-w-[400px] flex justify-between p-2 font-bold  ">
			<button
				onClick={() => {
					createData(data1);
					setDataTS(data1);
				}}
				className="__nav-item">
				Nepravidelná slovesa
			</button>

			<button
				onClick={() => {
					createData(data2);
					setDataTS(data2);
				}}
				className="__nav-item">
				Slovíčka B2
			</button>
		</header>
	);
}