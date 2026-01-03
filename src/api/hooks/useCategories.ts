import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../categories.api";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000,   // 30 minutes
    refetchOnWindowFocus: false,
   refetchOnReconnect: false
  });
}
