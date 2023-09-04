import Oxford from "@/components/oxford-flip/Oxford";
export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";
export default async function Page() {
	const dbData = await fetchDataALL();
	const dataArr=[dbData[1].oxford_b2,dbData[1].oxford_c1];
	return (
		<div>
			<Oxford props={dataArr} />
		</div>
	);
}
