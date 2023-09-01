import Memory from "@/components/memory/Memory";

export const revalidate = 3600;
import { fetchDataENG } from "@/utils/get-data";
import { Data1, Data2, Irregular } from "@/interface/Irregular";

interface Props {
	irregular_eng: Irregular[];
	oxford_b2?: Data2[];
	oxford_c1?: Data2[];
	phrasal?: Data2[];
}

export default async function Page() {

	const dbData: any = await fetchDataENG();

  return (
    <>
      {dbData && (
        <Memory
          irregular={dbData.irregular_eng.data}
          props1={dbData.oxford_b2.data}
          props2={dbData.oxford_c1.data}
        />
      )}
    </>
  );
}
