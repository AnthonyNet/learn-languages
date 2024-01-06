"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Irregular } from "@/interface/Props";
const style = {
	tr: "border-b-2 hover:even:bg-indigo-800/20 hover:odd:bg-pink-800/20  border-b-slate-700/40 even:bg-slate-700/40 even:border-b-slate-700/40 even:saturate-200",
	th: "text-sm font-medium py-2  sm:p-4 max-w-[25vw] sm:max-w-auto first:w-2",
} as const;

export default async function Table({ data }: { data: Irregular[] | null }) {
	const searchParams = useSearchParams();
	const query = searchParams.get("search") || "";

	return (
		<main className="overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div className="inline-block min-w-full sm:px-6 lg:px-8">
				<div className="overflow-hidden">
					<table className="w-full text-center text-[var(--color-main-accent)]">
						<thead className="border-b border-b-slate-700/30 bg-slate-900/70">
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
							{data &&
								data
									.filter((item: Irregular) => {
										return query.toLowerCase() === ""
											? item
											: item.cz_word.toLowerCase().startsWith(query) ||
													item.word.toLowerCase().startsWith(query) ||
													item.past_simple.toLowerCase().startsWith(query) ||
													item.past_participle.toLowerCase().startsWith(query);
									})
									.map((item: Irregular, index: number) => (
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
									))}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
}
