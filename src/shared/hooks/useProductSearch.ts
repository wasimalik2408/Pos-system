import { useCategories } from "@/api/categories/useCategories";
import { useEffect, useState } from "react";

export function useProductSearch() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const { data: categories = [] } = useCategories();

      // Auto-select first category once categories are loaded
      // Prevents empty product view on initial render
      useEffect(() => {
        if (categories.length > 0 && categoryId === null) {
         setCategoryId(categories[0].id);
        }
      }, [categories, categoryId]);



  return {
    categories,
    search,
    setSearch,
    categoryId,
    setCategoryId,
    clearSearch: () => setSearch("")
  };
}
