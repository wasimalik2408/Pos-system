import { useEffect, useState } from "react";
import { useCategories } from "../../../api/categories/useCategories";
import { useProducts } from "../../../api/products/useProducts";
import { useTables } from "../../../api/table/useTables";
import type { Product, Table, TableOrder, OrderInfo } from "../../../api/types";
import { createOrderActions } from "../../../shared/OrderActions";
import { generateOrderAndKot } from "@/utils/idGenerator";
import { useBarcodeScan } from "@/api/products/useBarcodeScan";

export function useDashboard() {
  
  const { data: categories = [] } = useCategories();
  const { data: tables = [] } = useTables();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const { data: products = [] } = useProducts({ categoryId: selectedCategory, search });
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Record<number, TableOrder>>({});
  const [holdOrders, setHoldOrders] = useState<TableOrder[]>([]);


 // Auto-select first category once categories are loaded
 // Prevents empty product view on initial render
    useEffect(() => {
      if (categories.length > 0 && selectedCategory === null) {
        setSelectedCategory(categories[0].id);
      }
    }, [categories, selectedCategory]);


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

  /* ---------- RESUME HOLD ORDER ---------- */
    // Restores a held order back into active flow
  const resumeHoldOrder = (order: TableOrder) => {
    // copy to active orders
    setOrders(prev => ({
      ...prev,
      [order.tableId]: { ...order, orderState: "active", status: "booked" }
    }));

    // keep it in holdOrders, but update info/items if already exists
    setHoldOrders(prev => {
      const exist = prev.find(o => o.orderId === order.orderId);
      if (exist) {
        return prev.map(o =>
          o.orderId === order.orderId ? { ...o, ...order } : o
        );
      }
      return [...prev, order];
    });

    setSelectedTableId(order.tableId);
  };

  /* ---------- ORDER INFO ---------- */
  // Updates customer/order metadata (name, order type, etc.)
  const updateOrderInfo = (info: OrderInfo) => {
    if (!selectedTableId) return;

    // Update current active order
    setOrders(prev => ({
      ...prev,
      [selectedTableId]: { ...prev[selectedTableId], info }
    }));

    // Also update holdOrders if this order exists there
    const activeOrder = orders[selectedTableId];
    if (!activeOrder) return;

    setHoldOrders(prev =>
      prev.map(o =>
        o.orderId === activeOrder.orderId ? { ...o, info } : o
      )
    );
  };

  /* ---------- PRODUCTS ---------- */
  const addProduct = (product: Product) => {
    if (!selectedTableId) return;

    setOrders(prev => {
      const order = prev[selectedTableId];
      const existing = order.items.find(i => i.productId === product.id);

      const items = existing
        ? order.items.map(i =>
            i.productId === product.id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...order.items, { productId: product.id, name: product.name, price: product.price, qty: 1, custDeiscription: product.custDeiscription }];

      return {
        ...prev,
        [selectedTableId]: { ...order, status: "booked", items }
      };
    });

    
    // Sync holdOrders if this order is already parked
    const activeOrder = orders[selectedTableId];
    if (!activeOrder) return;

    setHoldOrders(prev =>
      prev.map(o =>
        o.orderId === activeOrder.orderId
          ? { ...o, items: [...o.items, ...(activeOrder.items.filter(i => !o.items.find(x => x.productId === i.productId)))] }
          : o
      )
    );
  };
  
 /* =======================
     BARCODE SCAN INTEGRATION
     ======================= */

  // Listens to barcode input and resolves products
  useBarcodeScan({
    search,
    categoryId: selectedCategory,
    onAddProduct: addProduct,
    onClearSearch: () => setSearch("")
  });


    /* =======================
     PRODUCT REMOVAL LOGIC
     ======================= */

  // Removes product from active order
  const removeProduct = (productId: number) => {
    if (!selectedTableId) return;

    setOrders(prev => {
      const order = prev[selectedTableId];
      const items = order.items.filter(i => i.productId !== productId);

      return {
        ...prev,
        [selectedTableId]: { ...order, status: items.length ? "booked" : "free", items }
      };
    });


     // Sync removal with holdOrders
    const activeOrder = orders[selectedTableId];
    if (!activeOrder) return;

      setHoldOrders(prev =>
        prev.map(o =>
          o.orderId === activeOrder.orderId
            ? { ...o, items: o.items.filter(i => i.productId !== productId) }
            : o
        )
      );
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
    categories,
    products,
    selectedCategory,
    setSelectedCategory,
    search,
    setSearch,
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
