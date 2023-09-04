import Irregular from '@/components/irregular/Irregular';
export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";
export default async function Page() {
	const dbData = await fetchDataALL();
	return (
		dbData[1].irregular_ger && <Irregular irregular={dbData[1].irregular_ger} />
	);
}
