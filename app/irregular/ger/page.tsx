import Irregular from '@/components/irregular/Irregular';
export const revalidate = 3600;
import { fetchDataIrregularGER } from "@/utils/get-data";
export default async function Page() {
	const dbData = await fetchDataIrregularGER();
	return (
		dbData.data && <Irregular irregular={dbData.data} />
	);
}
