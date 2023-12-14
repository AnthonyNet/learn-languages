import { Suspense } from "react";
import { QuizSkeleton } from "@/components/ui/skeletons";

import Quiz from "@/components/quiz/Quiz";
import { fetchDataALL } from "@/utils/get-data";
export const revalidate = 3600;
export default async function Page() {
	const dbData = await fetchDataALL();

	return (
		<section className="w-screen h-100-dvh pt-[50px] md:pt-[70px] flex flex-col justify-center items-center  __small_screen_h-auto relative">
			<QuizSkeleton />
		</section>
	);
}
