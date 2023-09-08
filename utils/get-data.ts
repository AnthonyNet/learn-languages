import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { cache } from "react";

export const fetchDataALL = cache(async () => {

	  const supabase = createClientComponentClient();
	const tableNames = [
		"irregular_eng",
		"oxford_b2",
		"oxford_c1",
		"phrasal_verbs",
		"irregular_ger",
		"ger_verbs",
		"german_c1",
	];

	const dataCounts = Promise.all(
		[...tableNames].map((tableName) =>
			supabase.from(tableName).select("*", { count: "exact", head: true })
		)
	).then((values) => {
		const counts = {
			irregularEng: values[0].count ? values[0].count : 0,
			oxfordB2: values[1].count ? values[1].count : 0,
			oxfordC1: values[2].count ? values[2].count : 0,
			irregularGer: values[4].count ? values[4].count : 0,
			ger_verbs: values[5].count ? values[5].count : 0,
		};
		return counts;
	});

	const data = Promise.all(
		[...tableNames].map((tableName) => supabase.from(tableName).select())
	).then((values) => {
		const dataArr = {
			irregular_eng: values[0].data,
			oxford_b2: values[1].data,
			oxford_c1: values[2].data,
			phrasal: values[3].data,
			irregular_ger: values[4].data,
			ger_verbs: values[5].data,
			german_c1: values[6].data,
		};

		return dataArr;
	});

	const together = await Promise.all([dataCounts, data]);
	return together;
});

/*
let cachedENG: any = null;
export const fetchDataENG = cache(async () => {
	if (cachedENG) {
		return cachedENG;
	} else {
		const supabase = createClientComponentClient();
		const tableNames = [
		"irregular_eng",
		"oxford_b2",
		"oxford_c1",
		"phrasal"
	];
	try {
		const data = Promise.all(
			[...tableNames].map((tableName) => supabase.from(tableName).select())
		).then((values) => {
			const dataArr = [...values];
			cachedENG = {
				irregular_eng: dataArr[0],
				oxford_b2: dataArr[1],
				oxford_c1: dataArr[2],
				phrasal: dataArr[3],
			};
			return cachedENG
		});
		return data;
	} catch (error) {
		console.log("Failed to fetch data from server, utils/getData/fetchDataENG", error);
		throw error;
	}
	}
});


let cachedGER: any = null;
export const fetchDataGER = cache(async () => {

	if (cachedGER) {
		return cachedGER;
	} else {
		const supabase = createClientComponentClient();
		const tableNames = ["irregular_ger", "ger_verbs", "german_c1"];
		try {
			const data = Promise.all(
				[...tableNames].map((tableName) => supabase.from(tableName).select())
			).then((values) => {
				const dataArr = [...values];
				cachedGER = {
					irregular_ger: dataArr[0],
					ger_verbs: dataArr[1],
					german_c1: dataArr[2],
				};
				return cachedGER
			});
			return data;
		} catch (error) {
			console.log(
				"Failed to fetch data from server, utils/getData/fetchDataGER",
				error
			);
			throw error;
		}
	}

});

let cachedIrregularENG: any = null;
export const fetchDataIrregularENG = cache(async () => {
	if (cachedIrregularENG) {
		return cachedIrregularENG;
	} else {
		const supabase = createClientComponentClient();
		try {
			const irregular_eng = supabase.from("irregular_eng").select();
			cachedIrregularENG = irregular_eng;
			return irregular_eng;
		} catch (error) {
			console.log("Failed to fetch data from server", error);
			throw error;
		}
	}
});

let cachedIrregularGER: any = null;
export const fetchDataIrregularGER = cache(async () => {
	if (cachedIrregularGER) {
		return cachedIrregularGER;
	} else {
		const supabase = createClientComponentClient();
		try {
			const irregular_ger = supabase.from("irregular_ger").select();
			cachedIrregularGER = irregular_ger;
			return irregular_ger;
		} catch (error) {
			console.log("Failed to fetch data from server", error);
			throw error;
		}
	}
});

let cachedNavbar: any = null;

export const dataNavbar = cache(async () => {
	if (cachedNavbar) {
		return cachedNavbar;
	} else {
			const supabase = createClientComponentClient();
			const tableNames = [
				"irregular_eng",
				"irregular_ger",
				"ger_verbs",
				"oxford_b2",
				"oxford_c1",
				"german_c1",
			];
			const countedData = Promise.all(
				[...tableNames].map((tableName) =>
					supabase.from(tableName).select("*", { count: "exact", head: true })
				)
			).then((values) => {
				const counts = {
					irregularEng: values[0].count ? values[0].count : 0,
					irregularGer: values[1].count ? values[1].count : 0,
					ger_verbs: values[2].count ? values[2].count : 0,
					oxfordB2: values[3].count ? values[3].count : 0,
					oxfordC1: values[4].count ? values[4].count : 0,
				};
				return counts;
			});

			return countedData;
	}

});
*/
