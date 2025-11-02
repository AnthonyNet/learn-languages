import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export type NavData = {
	irregularEng: number;
	oxfordB2: number;
	oxfordC1: number;
	irregularGer: number;
	ger_verbs: number;
	acronyms: number;
};

export type DataArr = {
	irregular_eng: any[] | null;
	oxford_b2: any[] | null;
	oxford_c1: any[] | null;
	phrasal: any[] | null;
	irregular_ger: any[] | null;
	ger_verbs: any[] | null;
	german_c1: any[] | null;
	acronyms: any[] | null;
};
export const fetchDataALL = cache(async (): Promise<[NavData, DataArr]> => {
	const supabase = createSupabaseServerClient();

	const tableNames = [
		"irregular_eng",
		"oxford_b2",
		"oxford_c1",
		"phrasal_verbs",
		"irregular_ger",
		"ger_verbs",
		"german_c1",
		"acronyms",
	];

	// 1) načti počty
	const countsRaw = await Promise.all(
		tableNames.map((tableName) =>
			supabase.from(tableName).select("*", { count: "exact", head: true })
		)
	);

	const dataCounts: NavData = {
		irregularEng: countsRaw[0].count ?? 0,
		oxfordB2: countsRaw[1].count ?? 0,
		oxfordC1: countsRaw[2].count ?? 0,
		irregularGer: countsRaw[4].count ?? 0,
		ger_verbs: countsRaw[5].count ?? 0,
		acronyms: countsRaw[7].count ?? 0,
	};


	// 2) načti skutečná data
	const dataRaw = await Promise.all(
		tableNames.map((tableName) => supabase.from(tableName).select())
	);

	const dataArr: DataArr = {
		irregular_eng: dataRaw[0].data,
		oxford_b2: dataRaw[1].data,
		oxford_c1: dataRaw[2].data,
		phrasal: dataRaw[3].data,
		irregular_ger: dataRaw[4].data,
		ger_verbs: dataRaw[5].data,
		german_c1: dataRaw[6].data,
		acronyms: dataRaw[7].data,
	};

	return [dataCounts, dataArr];
});

export const fetchIrregularEng = cache(async () => {
	const supabase = createSupabaseServerClient();

	const { data, error } = await supabase
		.from("irregular_eng")
		.select()
		.order("id");

	if (error) {
		console.error("supabase error irregular_eng:", error);
		return [];
	}

	return data ?? [];
});

export const fetchIrregularGer = cache(async () => {
	const supabase = createSupabaseServerClient();

	const { data, error } = await supabase
		.from("irregular_ger")
		.select()
		.order("id");

	if (error) {
		console.error("supabase error irregular_ger:", error);
		return [];
	}

	return data ?? [];
});
