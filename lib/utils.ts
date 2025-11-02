import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { cache } from "react"
import { createSupabaseServerClient } from "@/lib/supabase-server";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchIrregularEng = cache(async () => {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
      .from("irregular_eng")
      .select("*")
      .order("id");

  if (error) {
    console.error("supabase error irregular_eng:", error);
    return [];
  }

  return data ?? [];
});

export const fetchIrregularGer = cache(async () => {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
      .from("irregular_ger")
      .select("*")
      .order("id");

  if (error) {
    console.error("supabase error irregular_ger:", error);
    return [];
  }

  return data ?? [];
});
