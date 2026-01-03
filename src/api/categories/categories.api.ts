import type { Category } from "../types";
// import { apiClient } from "../apiClient";
import catergory from "@/data/category.json";

export async function fetchCategories(): Promise<Category[]> {
  // const json = await apiClient<any>("/Home/GetCategoryList");
  const json = catergory;
  return json.returnValue.table.map((c: any) => ({
    id: c.id,
    referenceId: c.referenceId,
    name: c.name
  }));
}