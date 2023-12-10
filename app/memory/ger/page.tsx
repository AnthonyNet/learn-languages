import { Suspense } from "react";
import { MemorySkeleton } from "@/components/ui/skeletons";
import Memory from "@/components/memory/Memory";

export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";
export default async function Page() {
	const dbData: any = await fetchDataALL();
	return (
		<section className="w-screen h-screen relative flex flex-col items-center justify-center pt-[50px] sm:pt-[80px]">
			<Suspense fallback={<MemorySkeleton />}>
				<Memory
					irregular={dbData[1].irregular_ger}
					props1={dbData[1].ger_verbs}
					props2={dbData[1].german_c1}
				/>
			</Suspense>
		</section>
	);
}
