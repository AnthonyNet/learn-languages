import Quiz from "@/components/quiz/Quiz";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Page() {
	const supabase = createServerComponentClient({ cookies });

	try {
		const { data: irregular_ger } = await supabase.from("irregular_ger").select();
		const { data: ger_verbs } = await supabase.from("ger_verbs").select();
		const { data: german_c1 } = await supabase.from("german_c1").select();

		return (
			irregular_ger &&
			ger_verbs &&
			german_c1 && (
				<Quiz data1={irregular_ger} data2={ger_verbs} data3={german_c1} />
			)
		);
	} catch (error) {
		console.log("Failed to fetch data from server", error);
		throw error;
	}
}
