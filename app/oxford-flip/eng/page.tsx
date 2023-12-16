import { Suspense } from "react";
import { FlipCardSkeleton } from "@/components/ui/skeletons";

import Oxford from "@/components/oxford-flip/Oxford";
export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";
export default async function Page() {
	const dbData = await fetchDataALL();
	const dataArr: any = [dbData[1].oxford_b2, dbData[1].oxford_c1];
	return (
		<div>
			<Suspense fallback={<FlipCardSkeleton />}>
				<Oxford props={dataArr} />
			</Suspense>
		</div>
	);
}
