import Memory from "@/components/memory/Memory";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export default async function Page() {
		const supabase = createServerComponentClient({ cookies });

		try {
			const { data: ger_verbs } = await supabase.from("ger_verbs").select();
			const { data: irregular_ger } = await supabase
				.from("irregular_ger")
				.select();

			return (
				ger_verbs && irregular_ger && (
					<Memory props1={ger_verbs} props2={irregular_ger} />
				)
			);
		} catch (error) {
			console.log("Failed to fetch data from server", error);
			throw error;
		}
}
