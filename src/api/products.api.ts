import { apiClient } from "./apiClient";
import type { Product } from "./types";

type ProductResponse = {
  returnValue: {
    table: any[];
  };
};

function mapProduct(p: any): Product {
  return {
    id: p.id,
    categoryId: p.categoryId,
    name: p.productName,
    price: p.salePrice,
    image: p.picture,
    barcode: p.barcode,
    custDeiscription: p.custDeiscription
  };
}

export async function fetchProductsByCategory(
  categoryRefId: number
): Promise<Product[]> {
  const json = await apiClient<ProductResponse>(
    `/Home/GetItem_ListByCategoryId?CategoryId=${categoryRefId}`
  );

  return json.returnValue.table.map(mapProduct);
}

export async function fetchProductsByName(
  name: string
): Promise<Product[]> {
  const json = await apiClient<ProductResponse>(
    `/Home/GetItem_ListByName?ItemName=${name}`
  );

  return json.returnValue.table.map(mapProduct);
}
