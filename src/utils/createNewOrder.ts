import type { Table, TableOrder } from "@/api/types";
import { generateOrderAndKot } from "@/utils/idGenerator";

/**
 * Creates a new TableOrder for a given table.
 */
export const createNewOrder = (table: Table): TableOrder => {
  const { orderId, kotId } = generateOrderAndKot();

  return {
    tableId: table.id,
    status: "free",
    items: [],
    info: {
      orderType: table.type === "walk-in" ? "walk-in" : "dine-in",
      customerName: "",
    },
    orderState: "active",
    orderId,
    kotId,
  };
};
