import { useState } from "react";
import { useProducts } from "../../../api/products/useProducts";
import { useTables } from "../../../api/table/useTables";
import type { Product, Table, TableOrder, OrderInfo } from "../../../api/types";
import { createOrderActions } from "../../../shared/hooks/OrderActions";
import { useProductSearch } from "@/shared/hooks/useProductSearch";
import { generateOrderAndKot } from "@/utils/idGenerator";
import { useBarcodeScan } from "@/api/products/useBarcodeScan";

export function useDashboard() {
  
  const { data: tables = [] } = useTables();
  // const [selectedCategory] = useState<number | null>(null);
  const searchState = useProductSearch();
  const { data: products = [] } = useProducts({ categoryId: searchState.categoryId, search: searchState.search });
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Record<number, TableOrder>>({});
  const [holdOrders, setHoldOrders] = useState<TableOrder[]>([]);



  /* ---------- SELECT TABLE ---------- */
  // Activates a table and initializes an order if not present
  const selectTable = (table: Table) => {
    setSelectedTableId(table.id);
    setOrders(prev => {
      if (prev[table.id]) return prev; // resume existing active order

      const { orderId, kotId } = generateOrderAndKot();
      return {
        ...prev,
          [table.id]: {
          tableId: table.id,
          status: "free",
          items: [],
          info: { 
          orderType: table.type === "walk-in" ? "walk-in" : "dine-in",
          customerName: "" 
          },
          orderState: "active",
          orderId,
          kotId
        }
      };
    });
  };

  
  // Derived reference to currently active order
  const currentOrder = selectedTableId ? orders[selectedTableId] : null;


// /* ---------- ORDER UPDATES ---------- */
const updateActiveOrder = (
  updater: (order: TableOrder) => TableOrder
) => {
  if (!selectedTableId) return;

  setOrders(prev => {
    const order = prev[selectedTableId];
    if (!order) return prev;

    const updated = updater(order);

    // sync holdOrders if needed
    setHoldOrders(holds =>
      holds.map(o =>
        o.orderId === updated.orderId ? updated : o
      )
    );

    return {
      ...prev,
      [selectedTableId]: updated,
    };
  });
};


// Resumes a hold order into active orders
  const resumeHoldOrder = (order: TableOrder) => {
    setOrders(prev => ({
      ...prev,
      [order.tableId]: { ...order, orderState: "active", status: "booked" },
    }));

    setSelectedTableId(order.tableId);
  };


  /* ---------- ORDER INFO ---------- */
  // Updates customer/order metadata (name, order type, etc.)
    const updateOrderInfo = (info: OrderInfo) => {
      updateActiveOrder(order => ({
        ...order,
        info,
      }));
    };


  /* ---------- PRODUCTS ---------- */
    const addProduct = (product: Product) => {
      updateActiveOrder(order => {
        const existing = order.items.find(i => i.productId === product.id);

        const items = existing
          ? order.items.map(i =>
              i.productId === product.id ? { ...i, qty: i.qty + 1 } : i
            )
          : [
              ...order.items,
              {
                productId: product.id,
                name: product.name,
                price: product.price,
                qty: 1,
                custDeiscription: product.custDeiscription,
              },
            ];

        return {
          ...order,
          status: "booked",
          items,
        };
      });
    };

  // Listens to barcode input and resolves products
  useBarcodeScan({
    search: searchState.search,
    categoryId: searchState.categoryId,
    onAddProduct: addProduct,
    onClearSearch: () => searchState.setSearch("")
  });


  // Removes product from active order
      const removeProduct = (productId: number) => {
        updateActiveOrder(order => {
          const items = order.items.filter(i => i.productId !== productId);

          return {
            ...order,
            status: items.length ? "booked" : "free",
            items,
          };
        });
      };


   /* =======================
     ORDER ACTIONS (DOMAIN)
     ======================= */

  // Centralized order actions (hold, complete, cancel, etc.)
  const orderActions = createOrderActions({
    selectedTableId,
    setOrders,
    setHoldOrders,
    setSelectedTableId,
    currentOrder
  });

  
  /* =======================
     PUBLIC API (HOOK RETURN)
     ======================= */
  return {
    tables,
    products,
    ...searchState,
    orders,
    holdOrders,
    currentOrder,
    selectTable,
    resumeHoldOrder,
    updateOrderInfo,
    addProduct,
    removeProduct,
    ...orderActions
  };
}
