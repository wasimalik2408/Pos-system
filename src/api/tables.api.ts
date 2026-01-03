import tables from "@/data/tables.json";
import type { Table } from "./types";

export async function getTables(): Promise<Table[]> {
  return tables as Table[];
}