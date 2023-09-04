import Memory from "@/components/memory/Memory";

export const revalidate = 3600;
import {fetchDataALL } from "@/utils/get-data";
import { Data2, Irregular } from "@/interface/Props";

interface Props {
	irregular_eng: Irregular[];
	oxford_b2?: Data2[];
	oxford_c1?: Data2[];
	phrasal?: Data2[];
}

export default async function Page() {

	const dbData:any = await fetchDataALL();
	const {irregular_eng, oxford_b2, oxford_c1} = dbData[1];

  return (
			<Memory
				irregular={irregular_eng}
				props1={oxford_b2}
				props2={oxford_c1}
			/>
	);
}
