import { Irregular, Data2, Phrasal } from "@/interface/Props";

interface Props {
	props1: Data2[] | null;
	props2: Data2[] | null | undefined;
	phrasal?: Phrasal[] | null;
	createData: Function;
}

export default function TopMenu({
	props1,
	props2,
	phrasal,
	createData,
}: Props) {
	return (
		<header className="w-full max-w-[750px] flex justify-center flex-wrap  p-2 gap-6 font-bold">
			{phrasal && (
				<button
					onClick={() => {
						createData(phrasal);
					}}
					className="__nav-item">
					Frázová slovesa ({phrasal && phrasal.length})
				</button>
			)}

			<button
				onClick={() => {
					createData(props1);
				}}
				className="__nav-item">
				Slovíčka B2 ({props1 && props1.length})
			</button>

			<button
				onClick={() => {
					createData(props2);
				}}
				className="__nav-item">
				Slovíčka C1 ({props2 && props2.length})
			</button>
		</header>
	);
}
