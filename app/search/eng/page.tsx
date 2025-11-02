import { Suspense } from "react";
import { fetchIrregularEng } from "@/utils/get-data";
import SearchEngClient from "./SearchEngClient";

export const revalidate = 3600;

export default async function Page() {
	const irregular = await fetchIrregularEng();

	return (
		<Suspense fallback={<div>...loading</div>}>
			<SearchEngClient irregular={irregular} />
		</Suspense>
	);
}
