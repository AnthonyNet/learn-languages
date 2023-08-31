import Memory from "@/components/memory/Memory";
export const revalidate = 3600;
import { fetchDataGER } from "@/utils/get-data";
export default async function Page() {
const dbData = await fetchDataGER();
	return (
		<>
			{dbData && (
				<Memory
					props1={dbData.irregular_ger.data}
					props2={dbData.ger_verbs.data}
					props3={dbData.german_c1.data}
				/>
			)}
		</>
	)

}
