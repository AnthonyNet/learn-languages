"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const style = {
	section: "w-full h-auto mt-[10vh]",
	form: "shadow-md rounded p-4 md:p-8",
	input:
		"shadow appearance-none border rounded w-full py-2 px-3 max-w-[300px] __border_color ml-auto text-[var(--black)] font-bold",
	main: "flex flex-col",
	main__div: "overflow-x-auto sm:-mx-6 lg:-mx-8",
	main__div__div: "inline-block min-w-full sm:px-6 lg:px-8",
	main__div__div__div: "overflow-hidden",
	table: "w-full text-center",
	thead: "border-b border-b-slate-700/10 bg-slate-900/70",
	tr: "border-b-2 hover:even:bg-indigo-800/20 hover:odd:bg-pink-800/20  border-b-slate-700/40 even:bg-slate-700/10 even:border-b-slate-700/10",
	th: "text-sm font-medium py-2  sm:p-4 max-w-[25vw] sm:max-w-auto",
} as const;

type Props = {
	readonly lang: string;
}

type Data = {
	readonly cz: string;
	readonly base: string;
	readonly past_simple: string;
	readonly past_participle: string;
}
export default function SearchIrregular({lang}: Props) {
	const [start, setStart] = useState<boolean>(false);
	const [dataTS, setDataTS] = useState<Data[]>([]);

	const [search, setSearch] = useState("");
		const supabase = createClientComponentClient();

		const getData = async (): Promise<void> => {
			try {
				const { data: irregular_ger } = await supabase
					.from("irregular_ger")
					.select();
				const { data: irregular_eng } = await supabase
					.from("irregular_eng")
					.select();

				if (irregular_ger && irregular_eng) {
					setStart(true);
					if (lang === "ger") {
						setDataTS(irregular_ger);
					}
					if (lang === "eng") {
						setDataTS(irregular_eng);
					}
				}
			} catch (error) {
				console.error("Error in getData:", error);
				throw error;
			}
		};

	useEffect(() => {

		getData();
	}, [supabase, setDataTS]);

	return (
		<section className={style.section}>
			<form className={style.form}>
				<div>
					<input
						className={style.input}
						id="search"
						type="text"
						placeholder="Hledej slovo"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</form>

			<div className={style.main}>
				<div className={style.main__div}>
					<div className={style.main__div__div}>
						<div className={style.main__div__div__div}>
							<table className={style.table}>
								<thead className={style.thead}>
									<tr>
										<th scope="col" className={style.th}>
											#
										</th>
										<th scope="col" className={style.th}>
											CZ
										</th>
										<th scope="col" className={style.th}>
											ENG
										</th>
										<th scope="col" className={style.th}>
											Past Simple
										</th>
										<th scope="col" className={style.th}>
											Past Perfect
										</th>
									</tr>
								</thead>
								<tbody className="text-green">
									{start && (

										/* ----------------------
                      Find all matching words with the same value which has been written into the input
                      ---------------------- */

										dataTS.filter((item:Data) => {
											return search.toLowerCase() === ""
												? item
												: item.cz.toLowerCase().startsWith(search) ||
														item.base.toLowerCase().startsWith(search) ||
														item.past_simple.toLowerCase().startsWith(search) ||
														item.past_participle
															.toLowerCase()
															.startsWith(search);
										}).map((item:Data, index:number) => (
											<tr key={index} className={style.tr}>
												<th scope="col" className={style.th}>
													{index + 1}
												</th>
												<th scope="col" className={style.th}>
													{item.cz}
												</th>
												<th scope="col" className={style.th}>
													{item.base}
												</th>
												<th scope="col" className={style.th}>
													{item.past_simple}
												</th>
												<th scope="col" className={style.th}>
													{item.past_participle}
												</th>
											</tr>
										))

									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
