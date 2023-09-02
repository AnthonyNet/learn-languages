
import Search from "@/components/search/Search";
export const revalidate = 3600;
import { fetchDataIrregularENG } from "@/utils/get-data";
export default async function Page() {
	const dbData = await fetchDataIrregularENG();
	return  <Search irregular={dbData.data} />;
}
