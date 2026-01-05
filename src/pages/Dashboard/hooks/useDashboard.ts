import { useState } from "react";
import { useProducts } from "@/api/products/useProducts";
import { useTables } from "@/api/table/useTables";
import type { Table, TableOrder, OrderInfo } from "@/api/types";
import { createOrderActions } from "@/shared/hooks/OrderActions";
import { useProductSearch } from "@/shared/hooks/useProductSearch";
import { useBarcodeScan } from "@/api/products/useBarcodeScan";
import { createNewOrder } from "@/utils/createNewOrder";
import { useOrderProducts } from "@/shared/hooks/useOrderProducts";

export function useDashboard() {
  const { data: tables = [] } = useTables();

  const searchState = useProductSearch();

  const { data: products = [] } = useProducts({
    categoryId: searchState.categoryId,
    search: searchState.search,
  });

  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Record<number, TableOrder>>({});
  const [holdOrders, setHoldOrders] = useState<TableOrder[]>([]);

  const currentOrder = selectedTableId
    ? orders[selectedTableId] ?? null
    : null;

  // ------------------------
  // Table Selection (UI only)
  // ------------------------
 const selectTable = (table: Table) => {
  setSelectedTableId(table.id);
    setOrders(prev => prev[table.id] ? prev : {
      ...prev,
      [table.id]: createNewOrder(table),
    });
  };

   
  // ------------------------
  // Resume Hold Order
  // ------------------------
  const resumeHoldOrder = (order: TableOrder) => {
    setOrders(prev => ({
      ...prev,
      [order.tableId]: { ...order, orderState: "active", status: "booked" },
    }));
    setSelectedTableId(order.tableId);
  };

  // ------------------------
  // Update Active Order (lazy creation)
  // ------------------------
const updateActiveOrder = (updater: (order: TableOrder) => TableOrder) => {
  if (!selectedTableId) return; // no table selected → nothing to do

  setOrders(prev => {
    let order = prev[selectedTableId];

    const updated = updater(order);

    // Sync holdOrders if exists
    setHoldOrders(prevHold =>
      prevHold.map(o => (o.orderId === updated.orderId ? updated : o))
    );

    return { ...prev, [selectedTableId]: updated };
  });
};



  // ------------------------
  // Order Info
  // ------------------------
const updateOrderInfo = (info: OrderInfo) => {
  updateActiveOrder(order => ({
    ...order,
    info: {
      ...order.info, // preserve existing info
      ...info,       // override with user input
    },
  }));
};


  // ------------------------
  // Products
  // ------------------------
  const { addProduct, removeProduct } = useOrderProducts(updateActiveOrder);

  useBarcodeScan({
    search: searchState.search,
    categoryId: searchState.categoryId,
    onAddProduct: addProduct,
    onClearSearch: () => searchState.setSearch(""),
  });

  // ------------------------
  // Order Actions
  // ------------------------
  const orderActions = createOrderActions({
    selectedTableId,
    setOrders,
    setHoldOrders,
    setSelectedTableId,
    currentOrder,
  });
  return {
    tables,
    products,
    ...searchState,
    orders,
    holdOrders,
    currentOrder,
    selectedTableId,
    selectTable,
    resumeHoldOrder,
    updateOrderInfo,
    addProduct,
    removeProduct,
    ...orderActions,
  };
}
