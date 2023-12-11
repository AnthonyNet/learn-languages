import { Suspense } from "react";
import { QuizSkeleton } from "@/components/ui/skeletons";

import Quiz from "@/components/quiz/Quiz";

export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";
export default async function Page() {
	const dbData = await fetchDataALL();

	return (
		<section className="w-screen h-100-dvh pt-[50px] md:pt-[70px] flex flex-col justify-center items-center  __small_screen_h-auto relative">
			<Suspense fallback={<QuizSkeleton />}>
				<Quiz
					phrasal={dbData[1].phrasal}
					props1={dbData[1].oxford_b2}
					props2={dbData[1].oxford_c1}
				/>
			</Suspense>
		</section>
	);
}
