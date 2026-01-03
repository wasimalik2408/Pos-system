import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchProductsByCategory,
  fetchProductsByName
} from "./products.api";
import type { Product } from "../types";
import { useDebouncedValue } from "../../shared/hooks/useDebounce";

type Params = {
  categoryId: number | null;
  search: string;
};

export function useProducts({ categoryId, search }: Params) {
  const queryClient = useQueryClient();

  // 🔥 debounce search
  const debouncedSearch = useDebouncedValue(search, 300);

  /* ===============================
     1️⃣ CATEGORY PRODUCTS (CACHED)
     =============================== */
  const categoryQuery = useQuery<Product[]>({
    queryKey: ["products", "category", categoryId],
    queryFn: () =>
      categoryId ? fetchProductsByCategory(categoryId) : Promise.resolve([]),
    enabled: Boolean(categoryId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    placeholderData: previous => previous
  });

  /* ==================================================
     2️⃣ COLLECT ALL CACHED CATEGORY PRODUCTS (GLOBAL)
     ================================================== */
  const allCachedCategoryProducts: Product[] =
    queryClient
      .getQueryCache()
      .findAll({ queryKey: ["products", "category"] })
      .flatMap(q => (q.state.data as Product[]) ?? []);

  /* ===============================
     3️⃣ LOCAL SEARCH (NO API)
     =============================== */
  const localFiltered =
    debouncedSearch.length >= 3
      ? allCachedCategoryProducts.filter(p =>
          p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      : [];

  /* ===============================
     4️⃣ SEARCH API (LAST RESORT)
     =============================== */
  const shouldHitSearchApi =
    debouncedSearch.length >= 3 && localFiltered.length === 0;

  const searchQuery = useQuery<Product[]>({
    queryKey: ["products", "search", debouncedSearch],
    queryFn: () => fetchProductsByName(debouncedSearch),
    enabled: shouldHitSearchApi,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });

  /* ===============================
     5️⃣ FINAL DATA SOURCE
     =============================== */
  const data =
    debouncedSearch.length >= 3
      ? localFiltered.length > 0
        ? localFiltered
        : searchQuery.data ?? []
      : categoryQuery.data ?? [];
  return {
    data,
    isLoading: categoryQuery.isLoading || searchQuery.isLoading,
    isError: categoryQuery.isError || searchQuery.isError
  };
}
