import Oxford from "@/components/oxford-flip/Oxford";
export const revalidate = 3600;
import { fetchDataGER } from "@/utils/get-data";
export default async function Page() {
	const dbData = await fetchDataGER();
	const dataArr=[dbData.ger_verbs.data,dbData.german_c1.data];
	return (
		<div>
			<Oxford props={dataArr} />
		</div>
	);
}
