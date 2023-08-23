import Memory from "@/components/memory/Memory";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";


export default async function Page() {
	// Create a Supabase client configured to use cookies
	const supabase = createServerComponentClient({ cookies });

	try{
		const { data: oxford_b2 } = await supabase.from("oxford_b2").select();
	    const { data: irregular_eng } = await supabase.from("irregular_eng").select();

		return oxford_b2 && irregular_eng && <Memory  props1={oxford_b2} props2={irregular_eng} />;
	} catch(error){
		console.log("Failed to fetch data from server", error);
		throw error;
	}
}
