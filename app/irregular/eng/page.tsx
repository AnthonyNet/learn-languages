import { Suspense } from "react";

export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";

import Irregular from "@/components/irregular/Irregular";
import { IrregularSkeleton } from "@/components/ui/skeletons";
export default async function Page() {
	const dbData = await fetchDataALL();

	return (
		<section className="mt-[50px] md:mt-[70px] w-full h-100-dvh flex justify-center items-center __responsiveSection __small_screen_h-auto">
			<div className="w-full h-full md:h-auto md:w-auto min-w-[350px] flex flex-col justify-center items-center md:border-4 border-double __border_color rounded-[50px] text-center relative">
				<Suspense fallback={<IrregularSkeleton />}>
					<Irregular irregular={dbData[1].irregular_eng || []} />
				</Suspense>
			</div>
		</section>
	);
}
