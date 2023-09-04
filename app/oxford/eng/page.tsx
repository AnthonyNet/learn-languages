import Oxford from '@/components/oxford/Oxford';
export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";
interface DataTS {
	readonly id: string;
	readonly word: string;
	readonly sentence: string;
	readonly cz_word: string;
	readonly cz_sentence: string;
}


export default async function Page() {
	const dbData = await fetchDataALL();
	const dataArr = [dbData[1].oxford_b2, dbData[1].oxford_c1];

	return dbData && <Oxford props={dataArr} />;
}