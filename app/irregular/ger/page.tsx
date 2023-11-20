import Irregular from "@/components/irregular/Irregular";
export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";
export default async function Page() {
	const dbData = await fetchDataALL();
	return <Irregular irregular={dbData[1].irregular_ger || []} />;
}
