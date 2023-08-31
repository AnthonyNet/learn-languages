import Quiz from "@/components/quiz/Quiz";
import { fetchDataGER } from "@/utils/get-data";
export const revalidate = 3600;
export default async function Page() {

	const dbData = await fetchDataGER();

	return (
		<>
			{dbData && (
				<Quiz
					data1={dbData.irregular_ger.data}
					data2={dbData.ger_verbs.data}
					data3={dbData.german_c1.data}
				/>
			)}
		</>
	);
}
