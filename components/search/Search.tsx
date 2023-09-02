"use client";

import { useState, useEffect } from "react";
import {Irregular} from "@/interface/Props";
const style = {
	section: "w-full h-auto mt-[10vh]",
	form: "shadow-md rounded p-4 md:p-8",
	input:
		"shadow appearance-none border rounded w-full py-2 px-3 max-w-[300px] __border_color ml-auto text-[var(--black)] font-bold",
	main: "flex flex-col",
	main__div: "overflow-x-auto sm:-mx-6 lg:-mx-8",
	main__div__div: "inline-block min-w-full sm:px-6 lg:px-8",
	main__div__div__div: "overflow-hidden",
	table: "w-full text-center text-[var(--color-main-accent)]",
	thead: "border-b border-b-slate-700/30 bg-slate-900/70",
	tr: "border-b-2 hover:even:bg-indigo-800/20 hover:odd:bg-pink-800/20  border-b-slate-700/40 even:bg-slate-700/40 even:border-b-slate-700/40 even:saturate-200",
	th: "text-sm font-medium py-2  sm:p-4 max-w-[25vw] sm:max-w-auto",
} as const;

type Data = {
	readonly cz_word: string;
	readonly word: string;
	readonly past_simple: string;
	readonly past_participle: string;
}
export default function SearchIrregular({irregular}: {irregular: Irregular[] | null}) {
	const [start, setStart] = useState<boolean>(false);
	const [dataTS, setDataTS] = useState<Data[]>([]);

	const [search, setSearch] = useState("");

	useEffect(() => {
		async function getData() {
			const propsData = await irregular;
			if (propsData) {
				setStart(true);
				setDataTS(propsData);
			}
		}
		getData();
	}, []);

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
												: item.cz_word.toLowerCase().startsWith(search) ||
														item.word.toLowerCase().startsWith(search) ||
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
													{item.cz_word}
												</th>
												<th scope="col" className={style.th}>
													{item.word}
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
