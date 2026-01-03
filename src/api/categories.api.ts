import type { Category } from "./types";
import { apiClient } from "./apiClient";

export async function fetchCategories(): Promise<Category[]> {
  const json = await apiClient<any>("/Home/GetCategoryList");

  return json.returnValue.table.map((c: any) => ({
    id: c.id,
    referenceId: c.referenceId,
    name: c.name
  }));
}