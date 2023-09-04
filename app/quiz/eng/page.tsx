import Quiz from "@/components/quiz/Quiz";

export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";
export default async function Page() {

	const dbData = await fetchDataALL();

	return (
		<>
			{dbData && (
				<Quiz
					irregular={dbData[1].irregular_eng}
					props1={dbData[1].oxford_b2}
					props2={dbData[1].oxford_c1}
					phrasal={dbData[1].phrasal}
				/>
			)}
		</>
	);
}
