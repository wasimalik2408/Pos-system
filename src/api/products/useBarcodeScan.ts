import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Product } from "../types";
import { fetchProductsByName } from "./products.api";
import { isBarcode } from "../../utils/barcode";

type Params = {
  search: string;
  categoryId: number | null;
  onAddProduct: (product: Product) => void;
  onClearSearch: () => void;
};

export function useBarcodeScan({
  search,
  // categoryId,
  onAddProduct,
  onClearSearch
}: Params) {
  const queryClient = useQueryClient();
  const processingRef = useRef(false);

  useEffect(() => {
    if (!search || !isBarcode(search)) return;
    if (processingRef.current) return;

    processingRef.current = true;

    async function handleBarcode() {
      try {
        let product: Product | undefined;

        // ✅ 1️⃣ Search ALL cached products (category independent)
        const allQueries = queryClient.getQueriesData<Product[]>({
          queryKey: ["products"]
        });

        for (const [, products] of allQueries) {
          product = products?.find(p => p.barcode === search);
          if (product) break;
        }

        // ✅ 2️⃣ API fallback (barcode or name)
        if (!product) {
          const res = await fetchProductsByName(search);
          product = res[0];
        }

        // ✅ 3️⃣ Add product
        if (product) {
          onAddProduct(product);
          onClearSearch();
        }
      } finally {
        processingRef.current = false;
      }
    }

    handleBarcode();
  }, [search, queryClient, onAddProduct, onClearSearch]);
}
