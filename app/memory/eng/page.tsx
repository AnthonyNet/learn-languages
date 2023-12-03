import Memory from "@/components/memory/Memory";

export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";

export default async function Page() {
	const dbData: { [key: string]: any } = await fetchDataALL();
	const { irregular_eng, oxford_b2, oxford_c1 } = dbData[1];

	return dbData[1] ? (
		<Memory irregular={irregular_eng} props1={oxford_b2} props2={oxford_c1} />
	) : (
		<section className="flex h-screen w-screen items-center justify-center">
			<h1>Loading...</h1>
		</section>
	);
}
