import { useQuery } from "@tanstack/react-query";
import { getTables } from "../tables.api";

export function useTables() {
  return useQuery({
    queryKey: ["tables"],
    queryFn: getTables
  });
}
