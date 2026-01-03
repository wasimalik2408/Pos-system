import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchProductsByCategory,
  fetchProductsByName
} from "./products.api";
import type { Product } from "../types";

type Params = {
  categoryId: number | null;
  search: string;
};

export function useProducts({ categoryId, search }: Params) {
  const queryClient = useQueryClient();
  return useQuery<Product[]>({
    queryKey: ["products", categoryId, search],

    queryFn: async () => {
      // 🚫 nothing selected
      if (!categoryId && !search) return [];

      // ✅ category only
      if (categoryId && !search) {
        return fetchProductsByCategory(categoryId);
      }

      // 🔍 category + search
      if (categoryId && search) {
        // 🔥 read cached category products
        const cachedCategoryProducts =
          queryClient.getQueryData<Product[]>([
            "products",
            categoryId,
            ""
          ]);

        if (cachedCategoryProducts) {
          const localMatch = cachedCategoryProducts.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
          );

          // ✅ found locally → NO API HIT
          if (localMatch.length > 0) {
            return localMatch;
          }
        }

        // ❌ not found → fallback search API
        return fetchProductsByName(search);
      }

      // 🔍 search without category
      return fetchProductsByName(search);
    },

    enabled: Boolean(categoryId || search),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000,   // 30 minutes
    refetchOnWindowFocus: false,
   refetchOnReconnect: false
  });
}
