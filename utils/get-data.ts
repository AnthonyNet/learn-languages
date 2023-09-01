import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cache } from "react";
export const revalidate = 3600;
export const fetchDataENG = cache(async () => {
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

			return {
				irregular_eng: dataArr[0],
				oxford_b2: dataArr[1],
				oxford_c1: dataArr[2],
				phrasal: dataArr[3]
			}
		});
		return data;
	} catch (error) {
		console.log("Failed to fetch data from server, utils/getData/fetchDataENG", error);
		throw error;
	}
});

export const fetchDataGER = cache(async () => {

		const supabase = createClientComponentClient();
		const tableNames = ["irregular_ger", "ger_verbs", "german_c1"];
		try {
			const data = Promise.all(
				[...tableNames].map((tableName) => supabase.from(tableName).select())
			).then((values) => {
				const dataArr = [...values];

				return {
					irregular_ger: dataArr[0],
					ger_verbs: dataArr[1],
					german_c1: dataArr[2],
				};
			});
			return data;
		} catch (error) {
			console.log(
				"Failed to fetch data from server, utils/getData/fetchDataGER",
				error
			);
			throw error;
		}
});

export const fetchDataIrregularENG = cache(async () => {
	const supabase = createClientComponentClient();
	try {
		const irregular_eng = supabase.from("irregular_eng").select();

		return irregular_eng
	} catch (error) {
		console.log("Failed to fetch data from server", error);
		throw error;
	}
});

export const fetchDataIrregularGER = cache(async () => {
	const supabase = createClientComponentClient();
	try {
		const irregular_ger = supabase.from("irregular_ger").select();

		return irregular_ger
	} catch (error) {
		console.log("Failed to fetch data from server", error);
		throw error;
	}
});

export const dataNavbar = cache(async () => {
		const supabase = createClientComponentClient();
		const tableNames = [
			"irregular_eng",
			"irregular_ger",
			"ger_verbs",
			"oxford_b2",
			"oxford_c1",
			"ger_verbs",
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

		return countedData
});

/*
export const fetchDataALL = cache(async () => {
	const supabase = createClientComponentClient();
	 const tableNames = [
			"irregular_eng",
			"irregular_ger",
			"ger_verbs",
			"oxford_b2",
			"oxford_c1",
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
			irregularGer: values[1].count ? values[1].count : 0,
			ger_verbs: values[2].count ? values[2].count : 0,
			oxfordB2: values[3].count ? values[3].count : 0,
			oxfordC1: values[4].count ? values[4].count : 0,
		};
	return counts;
	});

	const data = Promise.all(
		[...tableNames].map((tableName) =>
			supabase.from(tableName).select()
		)).then((values) => {
			const dataArr = [...values];
			return dataArr.map((item) => {
				return item.data
			})
		})

		const together = await Promise.all([dataCounts, data]);

		return together

});
*/