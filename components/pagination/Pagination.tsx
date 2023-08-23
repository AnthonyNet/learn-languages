"use client";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {Data1} from "@/interface/Irregular";

import { useState, useEffect } from "react";

import Top_Menu from "./Top_menu";
import Bottom_Menu from "./Bottom_menu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Data{
	id: string;
	word: string;
	cz_word: string;
	sentence?: string;
	cz_sentence?: string;
}

export default function Pagination() {
	const supabase = createClientComponentClient();
	const [start, setStart] = useState<boolean>(false);

	const [dataTS, setDataTS] = useState<[] | Data[]>([]);
	const [oxfordB2, setOxfordB2] = useState<[] | Data[]>([]);
	const [phrasalVerbs, setPhrasalVerbs] = useState<[] | Data[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [wordsPerPage, setPostsPerPage] = useState<number>(10);
	const [myNumb, setMyNumb] = useState(1);

	const getData = async (): Promise<void> => {
		try {
			const { data: oxford_b2 } = await supabase.from("oxford_b2").select();
			const { data: phrasal_verbs } = await supabase
				.from("phrasal_verbs")
				.select();
			if (oxford_b2 && phrasal_verbs) {
				setDataTS(oxford_b2);
				setOxfordB2(oxford_b2);
				setPhrasalVerbs(phrasal_verbs);
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

	/* Pagination SETUP */
	/* This can potentially be a problem */
	/* Need to find out a better way to do this */

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
	/* -------------------
Watch the value that is set up in Top_menu
------------------- */

	useEffect(() => {
		if (myNumb == 0) {
			setDataTS(phrasalVerbs);
		} else if (myNumb == 1) {
			setDataTS(oxfordB2);
		} else {
			setDataTS(dataTS);
		}
	}, [myNumb]);
	/* ---------------
	CAPITALIZE FIRST LETTER
-----------------*/
	const capitalizeFirst = (word: any) => {
		const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
		return capitalizedWord;
	};

	return (
		<section className="min-h-screen pt-[50px] md:pt-[70px] flex flex-column justify-center items-baseline flex-wrap">
			<Top_Menu
				myNumb={myNumb}
				setMyNumb={setMyNumb}
				setCurrentPage={setCurrentPage}
			/>

			<main className="w-full flex flex-col justify-between items-center">
				<Table>
					<TableCaption className="hidden lg:visible">Vyber stránku</TableCaption>
					<TableHeader>
						<TableRow className="hover:bg-indigo-800/40">
							<TableHead className="xl:w-[100px]">Nr.</TableHead>
							<TableHead className="text-center">English</TableHead>

							<TableHead className="text-center">Czech</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className={myNumb == 0 ? "text-center" : ""}>
						{start &&
							currentPosts.map((item: Data, index: number) => {
								return (
									<TableRow className="hover:even:bg-indigo-800/40 hover:odd:bg-pink-800/20 border-b border-slate-700/80 odd:bg-slate-700/30">
										<TableCell className="font-medium">{index + 1}</TableCell>
										<TableCell>
											{myNumb == 1 ? item.sentence : item.word}
										</TableCell>
										<TableCell>
											{myNumb == 1 ? item.cz_sentence : item.cz_word}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
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
