import Quiz from "@/components/quiz/Quiz";
import { fetchDataGER } from "@/utils/get-data";
export const revalidate = 3600;
export default async function Page() {

	const dbData = await fetchDataGER();

	return (
		<>
			{dbData && (
				<Quiz
					irregular={dbData.irregular_ger.data}
					props1={dbData.ger_verbs.data}
					props2={dbData.german_c1.data}
				/>
			)}
		</>
	);
}
