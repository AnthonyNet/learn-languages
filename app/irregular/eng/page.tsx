import Irregular from "@/components/irregular/Irregular";
export const revalidate = 3600;
import { fetchDataIrregularENG } from "@/utils/get-data";
export default async function Page() {
const dbData = await fetchDataIrregularENG();

	return dbData.data && <Irregular irregular={dbData.data} />;
}
