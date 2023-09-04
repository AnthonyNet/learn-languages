import Oxford from "@/components/oxford-flip/Oxford";
export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";
export default async function Page() {
	const dbData = await fetchDataALL();
	const dataArr=[dbData[1].ger_verbs,dbData[1].german_c1];
	return <Oxford props={dataArr} />;
}
