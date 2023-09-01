import Memory from "@/components/memory/Memory";
export const revalidate = 3600;
import { fetchDataGER } from "@/utils/get-data";
export default async function Page() {

const dbData: any = await fetchDataGER();
	return (
		<>
			{dbData && (
				<Memory
					irregular={dbData.irregular_ger.data}
					props1={dbData.ger_verbs.data}
					props2={dbData.german_c1.data}
				/>
			)}
		</>
	)

}
