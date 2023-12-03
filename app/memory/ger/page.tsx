import Memory from "@/components/memory/Memory";
export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";
export default async function Page() {
	const dbData: any = await fetchDataALL();
	return (
		<>
			{dbData ? (
				<Memory
					irregular={dbData[1].irregular_ger}
					props1={dbData[1].ger_verbs}
					props2={dbData[1].german_c1}
				/>
			) : (
				<section className="flex h-screen w-screen items-center justify-center">
					<h1>Loading...</h1>
				</section>
			)}
		</>
	);
}
