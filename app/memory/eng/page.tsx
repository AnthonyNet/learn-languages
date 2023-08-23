import Memory from "@/components/memory/Memory";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";


export default async function Page() {
	// Create a Supabase client configured to use cookies
	const supabase = createServerComponentClient({ cookies });

	try{
		const { data: irregular_eng } = await supabase.from("irregular_eng").select();
		const { data: oxford_b2 } = await supabase.from("oxford_b2").select();
		const { data: oxford_c1 } = await supabase.from("oxford_c1").select();


		return (
			irregular_eng && oxford_b2 && oxford_c1 &&
			 <Memory props1={irregular_eng} props2={oxford_b2} props3={oxford_c1} />
		);
	} catch(error){
		console.log("Failed to fetch data from server", error);
		throw error;
	}
}
