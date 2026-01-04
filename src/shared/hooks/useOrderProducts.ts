import type { TableOrder, Product } from "@/api/types";

/**
 * Hook for managing add/remove product logic for a single order.
 * @param updateOrder - function to update the current order state
 */
export const useOrderProducts = (
  updateOrder: (updater: (order: TableOrder) => TableOrder) => void
) => {
  const addProduct = (product: Product) => {
    updateOrder(order => {
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
      return { ...order, status: "booked", items };
    });
  };

  const removeProduct = (productId: number) => {
    updateOrder(order => {
      const items = order.items.filter(i => i.productId !== productId);
      return { ...order, status: items.length ? "booked" : "free", items };
    });
  };

  return { addProduct, removeProduct };
};
