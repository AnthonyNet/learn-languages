import { Suspense } from "react";
import { FlipCardSkeleton } from "@/components/ui/skeletons";

import FlipCard from "@/components/flip-card/FlipCard";
export const revalidate = 3600;
import { fetchDataALL } from "@/utils/get-data";
export default async function Page() {
    const dbData = await fetchDataALL();
    const dataArr: any = [dbData[1].acronyms, dbData[1].acronyms];
    return (
        <div>
            <Suspense fallback={<FlipCardSkeleton />}>
                <FlipCard props={dataArr} />
            </Suspense>
        </div>
    );
}
