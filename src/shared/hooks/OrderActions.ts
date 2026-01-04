import type { TableOrder } from "../../api/types";

type OrderActionsParams = {
  selectedTableId: number | null;
  setOrders: React.Dispatch<React.SetStateAction<Record<number, TableOrder>>>;
  setHoldOrders: React.Dispatch<React.SetStateAction<TableOrder[]>>;
  setSelectedTableId: (id: number | null) => void;
  currentOrder: TableOrder | null;
};

export const createOrderActions = ({
  selectedTableId,
  setOrders,
  setHoldOrders,
  setSelectedTableId,
  currentOrder,
}: OrderActionsParams) => {
  if (!currentOrder || selectedTableId === null) {
    const noop = () => {};
    return {
      holdOrder: noop,
      completeOrder: noop,
      cancelOrder: noop,
      quickPrint: noop,
    };
  }

  const clearActive = () => {
    setOrders((prev) => {
      const { [selectedTableId]: _, ...rest } = prev;
      return rest;
    });
    setSelectedTableId(null);
  };

  const holdOrder = () => {
    setHoldOrders((prev) => {
      const order: TableOrder = {
        ...currentOrder,
        orderState: "hold", // inferred correctly
      };

      return prev.some((o) => o.orderId === order.orderId)
        ? prev.map((o) => (o.orderId === order.orderId ? order : o))
        : [...prev, order];
    });

    clearActive();
  };

  const completeOrder = () => {
    setHoldOrders((prev) =>
      prev.filter((o) => o.orderId !== currentOrder.orderId)
    );
    clearActive();
  };

  const cancelOrder = completeOrder;

  const quickPrint = () => {
    console.log("Printing order:", currentOrder);
  };

  return { holdOrder, completeOrder, cancelOrder, quickPrint };
};
