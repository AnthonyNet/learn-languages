import Search from "@/components/search/Search";
export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";
export default async function Page() {
	const dbData = await fetchDataALL();
			dbData[1].irregular_eng && <Search irregular={dbData[1].irregular_eng} />;
}
