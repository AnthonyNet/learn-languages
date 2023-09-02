import Oxford from '@/components/oxford/Oxford';
export const revalidate = 3600;
import { fetchDataENG } from "@/utils/get-data";

export default async function Page() {
	const dbData = await fetchDataENG();
	const dataArr = [dbData.oxford_b2.data, dbData.oxford_c1.data];

	return <Oxford props={dataArr}/>
}