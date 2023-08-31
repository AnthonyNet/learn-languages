import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export const revalidate = 3600;
export const fetchDataENG = async () => {
	const supabase = createClientComponentClient();
	try {
		const fetchIrregularEng = supabase.from("irregular_eng").select();
		const fetchOxfordB2 = supabase.from("oxford_b2").select();
		const fetchOxfordC1 = supabase.from("oxford_c1").select();
		const fetchPhrasal = supabase.from("phrasal_verbs").select();

		const [irregular_eng, oxford_b2, oxford_c1, phrasal] = await Promise.all([
			fetchIrregularEng,
			fetchOxfordB2,
			fetchOxfordC1,
			fetchPhrasal
		]);

		return { irregular_eng, oxford_b2, oxford_c1, phrasal };
	} catch (error) {
		console.log("Failed to fetch data from server", error);
		throw error;
	}
};


export const fetchDataGER = async () => {
	const supabase = createClientComponentClient();
	try {
		const fetchIrregularGer = supabase.from("irregular_ger").select();
		const fetchGermanC1 = supabase.from("german_c1").select();
		const fetchVerbs = supabase.from("ger_verbs").select();

		const [irregular_ger, ger_verbs, german_c1] = await Promise.all([
			fetchIrregularGer,
			fetchVerbs,
			fetchGermanC1,
		]);

		return { irregular_ger, ger_verbs, german_c1 };
	} catch (error) {
		console.log("Failed to fetch data from server", error);
		throw error;
	}
};

export const fetchDataIrregular = async () => {
	const supabase = createClientComponentClient();
	try {
		const fetchIrregularEng = supabase.from("irregular_eng").select();
		const fetchIrregularGer = supabase.from("irregular_ger").select();

		const [irregular_eng, irregular_ger] = await Promise.all([
			fetchIrregularEng,
			fetchIrregularGer
		]);

		return { irregular_ger };
	} catch (error) {
		console.log("Failed to fetch data from server", error);
		throw error;
	}
};
