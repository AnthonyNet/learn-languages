import Memory from "@/components/memory/Memory";

export const revalidate = 3600;
import { fetchDataENG } from "@/utils/get-data";

export default async function Page() {

	const dbData = await fetchDataENG();

  return (
    <>
      {dbData && (
        <Memory
          props1={dbData.irregular_eng.data}
          props2={dbData.oxford_b2.data}
          props3={dbData.oxford_c1.data}
        />
      )}
    </>
  );
}
