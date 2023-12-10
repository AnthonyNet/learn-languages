import { Suspense } from "react";
import { MemorySkeleton } from "@/components/ui/skeletons";
import Memory from "@/components/memory/Memory";

export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";

export default async function Page() {
	const dbData: { [key: string]: any } = await fetchDataALL();
	const { irregular_eng, oxford_b2, oxford_c1 } = dbData[1];

	return (
		<section className="w-screen h-screen relative flex flex-col items-center justify-center pt-[50px] sm:pt-[80px]">
			<Suspense fallback={<MemorySkeleton />}>
				<Memory
					irregular={irregular_eng}
					props1={oxford_b2}
					props2={oxford_c1}
				/>
			</Suspense>
		</section>
	);
}
