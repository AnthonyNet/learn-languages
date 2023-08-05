"use client";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/app/components/ui/table";

import { useState, useEffect } from "react";

import Top_Menu from "./Top_menu";
import Bottom_Menu from "./Bottom_menu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";



export default function Pagination() {
	const supabase = createClientComponentClient();
	const [start, setStart] = useState<boolean>(false);

	const [dataTS, setDataTS] = useState<any>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [wordsPerPage, setPostsPerPage] = useState<number>(10);

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
		<section className="flex flex-column justify-center items-baseline flex-wrap">
			<Top_Menu
				myNumb={myNumb}
				setMyNumb={setMyNumb}
				setCurrentPage={setCurrentPage}
			/>

			<main className="w-full flex flex-col justify-between items-center">
				<Table>
					<TableCaption>Select a page</TableCaption>
					<TableHeader>
						<TableRow className="hover:bg-indigo-800/40">
							<TableHead className="xl:w-[100px]">Nr.</TableHead>
							<TableHead className="text-center">English</TableHead>

							<TableHead className="text-center">Czech</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{start &&
							currentPosts.map(
								(item: { [key: string]: string }, index: number) => {
									return (
										<TableRow className="hover:even:bg-indigo-800/40 hover:odd:bg-pink-800/20">
											<TableCell className="font-medium">{index + 1}</TableCell>
											<TableCell>{item.sentence}</TableCell>
											<TableCell>{item.cz_sentence}</TableCell>
										</TableRow>
									);
								}
							)}
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
