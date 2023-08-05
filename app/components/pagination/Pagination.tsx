"use client";

import { useState, useEffect } from "react";

import Top_Menu from "./Top_menu";
import Bottom_Menu from "./Bottom_menu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const styles = {
	section: "flex flex-column justify-center items-baseline flex-wrap",
	main: "w-full flex flex-col justify-between items-center",
	h2: "text-center",
	table: "table-fixed min-w-[50vw] max-w-[90%]",
	thead__tr: "flex justify-around",
	tbody__td: "w-[50%] __border_color  text-right",
} as const;

export default function Pagination() {
	const supabase = createClientComponentClient();
	const [start, setStart] = useState<boolean>(false);
	const [rand, setRand] = useState<any>({});
	const [dataTS, setDataTS] = useState<any>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [wordsPerPage, setPostsPerPage] = useState<number>(20);


const getData = async (): Promise<void> => {
	try {
		const { data: oxford_b2 } = await supabase.from("oxford_b2").select();
		if (oxford_b2) {
			setDataTS(oxford_b2);
			setStart(true);
		}
	} catch (error) {
		console.error("Error in getData:", error);
		throw error;
	}
};
useEffect(() => {
	getData();
}, [supabase, setDataTS]);

	//  20                    1             20
	const lastWordIndex: number = currentPage * wordsPerPage;
	//      0              20                 20
	const firstWordIndex: number = lastWordIndex - wordsPerPage;
	//                                0                  20
	const currentPosts = dataTS.slice(firstWordIndex, lastWordIndex);

	let pages: number[] = [];

	for (let i = 1; i <= Math.ceil(dataTS.length / wordsPerPage); i++) {
		pages.push(i);
	}

	const prevPage = () => {
		if (currentPage < 2) {
			setCurrentPage(pages.length);
		} else {
			setCurrentPage((page) => page - 1);
		}
	};

	const nextPage = () => {
		if (currentPage > pages.length - 1) {
			setCurrentPage(1);
		} else {
			setCurrentPage((page) => page + 1);
		}
	};

	const [myNumb, setMyNumb] = useState(0);

	useEffect(() => {
		if (myNumb == 0) {
			setDataTS(dataTS);
		} else if (myNumb == 1) {
			setDataTS(dataTS);
		} else if (myNumb == 2) {
			setDataTS(dataTS);
		} else {
			setDataTS(dataTS);
		}
	}, [myNumb]);

	const capitalizeFirst = (word: any) => {
		const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
		return capitalizedWord;
	};

	return (
		<section className={styles.section}>
			<Top_Menu
				myNumb={myNumb}
				setMyNumb={setMyNumb}
				setCurrentPage={setCurrentPage}
			/>

			<main className={styles.main}>

				<table className={styles.table}>
					<thead>
						<tr className={styles.thead__tr}>
							<th>English</th>
							<th>Czech</th>
						</tr>
					</thead>
					<tbody>
						{currentPosts.map((item: {[key:string]:string }, index:number) => {
							return (
								<tr
									key={index}
									className="border-b-2 border-dotted __border_color flex  flex-nowrap cursor-pointer __nav-item">
										<td className="w-[50%] text-left">
											{capitalizeFirst(item.sentence)}
										</td>
									<td className={styles.tbody__td}>
										{capitalizeFirst(item.cz_sentence)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</main>

			<Bottom_Menu
				pages={pages}
				prevPage={prevPage}
				nextPage={nextPage}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</section>
	);
}