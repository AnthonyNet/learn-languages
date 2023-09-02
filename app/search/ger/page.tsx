import Search from "@/components/search/Search";
export const revalidate = 3600;
import { fetchDataIrregularGER } from "@/utils/get-data";
export default async function Page() {
	const dbData = await fetchDataIrregularGER();
			dbData.data && <Search irregular={dbData.data} />;

}
