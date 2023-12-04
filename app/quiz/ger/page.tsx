import Quiz from "@/components/quiz/Quiz";
import { fetchDataALL } from "@/utils/get-data";
export const revalidate = 3600;
export default async function Page() {

	const dbData =  await fetchDataALL();

	return (
		<>
			{!dbData ? (
				<section className="flex h-screen w-screen items-center justify-center">
					<h1>Loading...</h1>
				</section>
			) : (
				<Quiz
					irregular={dbData[1].irregular_ger}
					props1={dbData[1].ger_verbs}
					props2={dbData[1].german_c1}
				/>
			)}
		</>
	);
}
