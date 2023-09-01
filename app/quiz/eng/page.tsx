import Quiz from "@/components/quiz/Quiz";

export const revalidate = 3600;
import { fetchDataENG } from "@/utils/get-data";
export default async function Page() {

	const dbData = await fetchDataENG();

	return (
		<>
			{dbData && (
				<Quiz
					irregular={dbData.irregular_eng.data}
					props1={dbData.oxford_b2.data}
					props2={dbData.oxford_c1.data}
					phrasal={dbData.phrasal.data}
				/>
			)}
		</>
	);
}
