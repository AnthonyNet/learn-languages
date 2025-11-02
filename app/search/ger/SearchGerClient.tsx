"use client";

import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/search/SearchInput";
import Table from "@/components/search/Table";
import { Irregular } from "@/interface/Props";

export default function SearchEngClient({
                                            irregular,
                                        }: {
    irregular: Irregular[];
}) {
    const searchParams = useSearchParams();
    const q = (searchParams.get("q") ?? "").toLowerCase().trim();

    const filtered = q
        ? irregular.filter((item) => {
            const vals = [
                item.cz_word,
                item.word,
                item.past_simple,
                item.past_participle,
            ]
                .filter(Boolean)
                .map((v) => String(v).toLowerCase());
            return vals.some((v) => v.includes(q));
        })
        : irregular;

    return (
        <section className="w-full h-auto mt-[10vh]">
            <SearchInput placeholder="Hledej slovo..." />
            <div className="flex flex-col">
                <Table data={filtered} />
            </div>
        </section>
    );
}
