
import Search from "@/components/search/Search";
export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";
import {Suspense} from "react";

export default async function Page() {
	const dbData = await fetchDataALL();
	return (
		<section className="w-full h-auto mt-[10vh]">
			<Suspense fallback={<div>Loading...</div>}>
				<Search
					irregular={dbData[1].irregular_eng}
				/>
			</Suspense>
		</section>
	);
}
