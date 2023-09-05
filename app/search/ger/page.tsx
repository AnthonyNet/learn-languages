import Search from "@/components/search/Search";
export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";
export default async function Page() {
	const dbData = await fetchDataALL();
			return dbData[1].irregular_ger && <Search irregular={dbData[1].irregular_ger} />;
}
