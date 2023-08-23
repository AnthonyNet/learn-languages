import Quiz from "@/components/quiz/Quiz";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Page() {

	const supabase = createServerComponentClient({ cookies });

	try {
		const { data: irregular_eng } = await supabase.from("irregular_eng").select();
		const { data: oxford_b2 } = await supabase.from("oxford_b2").select();
		const { data: oxford_c1 } = await supabase.from("oxford_c1").select();
		const { data: phrasal_verbs } = await supabase.from("phrasal_verbs").select();
		return irregular_eng && oxford_b2 && oxford_c1 && phrasal_verbs && <Quiz  data1={irregular_eng} data2={oxford_b2} data3={oxford_c1} phrasal={phrasal_verbs} />;
	} catch (error) {
		console.log("Failed to fetch data from server", error);
		throw error;
	}
}
