import { Suspense } from "react";
import { fetchIrregularGer } from "@/utils/get-data";
import SearchEngClient from "./SearchGerClient";

export const revalidate = 3600;

export default async function Page() {
	const irregular = await fetchIrregularGer();

	return (
		<Suspense fallback={<div>...loading</div>}>
			<SearchEngClient irregular={irregular} />
		</Suspense>
	);
}
