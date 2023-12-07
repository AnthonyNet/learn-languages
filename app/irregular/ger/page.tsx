import { Suspense } from "react";

export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";

import Irregular from "@/components/irregular/Irregular";
import { IrregularSkeleton } from "@/components/ui/skeletons";
export default async function Page() {
	const dbData = await fetchDataALL();
	return (
		<section className="mt-[50px] md:mt-[70px] w-full h-100-dvh flex justify-center items-center __responsiveSection __small_screen_h-auto">
			<Suspense fallback={<IrregularSkeleton />}>
				<Irregular irregular={dbData[1].irregular_ger || []} />
			</Suspense>
		</section>
	);
}
