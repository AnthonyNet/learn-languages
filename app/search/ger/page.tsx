import { fetchDataALL } from "@/utils/get-data";
import { Suspense } from "react";

import SearchInput from "@/components/search/SearchInput";
import Table from "@/components/search/Table";

export const revalidate = 3600;

export default async function Page() {
	const data = await fetchDataALL();

	return (
		<section className="w-full h-auto mt-[10vh]">
			<SearchInput placeholder="Hledej slovo..." />
			<div className="flex flex-col">
				<Suspense fallback={<div>...loading</div>}>
					<Table data={data[1].irregular_ger} />
				</Suspense>
			</div>
		</section>
	);
}
