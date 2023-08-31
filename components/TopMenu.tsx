import {Data1, Data2, Phrasal} from "@/interface/Irregular";

interface Props {
	createData: Function;
	data1?: Data1[] | null;
	data2: Data2[] | null;
	data3: Data2[] | null;
	phrasal?: Phrasal[] | null;
	setDataTS: Function;
}

export default function TopMenu({ createData, data1, data2, data3, phrasal, setDataTS }: Props) {
	return (
		<header className="w-full max-w-[750px] grid grid-cols-2 grid-rows-2 gap-2 lg:flex lg:justify-center lg:gap-8 p-2 font-bold">

			{phrasal && (
				<button
					onClick={() => {
						createData(phrasal);
						setDataTS(phrasal);
					}}
					className="__nav-item">
					Frázová slovesa ({phrasal&&phrasal.length})
				</button>
			)}

				<button
					onClick={() => {
						createData(data1);
						setDataTS(data1);
					}}
					className="__nav-item">
					Slovíčka B1 ({data1&&data1.length})
				</button>

			<button
				onClick={() => {
					createData(data2);
					setDataTS(data2);
				}}
				className="__nav-item">
				Slovíčka B2 ({data2&&data2.length})
			</button>

			<button
				onClick={() => {
					createData(data3);
					setDataTS(data3);
				}}
				className="__nav-item">
				Slovíčka C1 ({data3&&data3.length})
			</button>
		</header>
	);
}