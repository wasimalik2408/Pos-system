import type { TableOrder } from "../api/types";

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
  currentOrder
}: OrderActionsParams) => {

  const holdOrder = () => {
    if (!currentOrder || selectedTableId === null) return;

    // add/update in holdOrders
    setHoldOrders(prev => {
      const exist = prev.find(o => o.orderId === currentOrder.orderId);
      if (exist) {
        return prev.map(o =>
          o.orderId === currentOrder.orderId ? { ...currentOrder, orderState: "hold" } : o
        );
      }
      return [...prev, { ...currentOrder, orderState: "hold" }];
    });

    // remove from active orders
    setOrders(prev => {
      const copy = { ...prev };
      delete copy[selectedTableId];
      return copy;
    });

    setSelectedTableId(null);
  };

  const completeOrder = () => {
    if (!currentOrder || selectedTableId === null) return;

    // remove from active orders
    setOrders(prev => {
      const copy = { ...prev };
      delete copy[selectedTableId];
      return copy;
    });

    // remove from holdOrders if exists
    setHoldOrders(prev => prev.filter(o => o.orderId !== currentOrder.orderId));

    setSelectedTableId(null);
  };

  const cancelOrder = () => {
    if (!currentOrder || selectedTableId === null) return;

    // remove from active orders
    setOrders(prev => {
      const copy = { ...prev };
      delete copy[selectedTableId];
      return copy;
    });

    // remove from holdOrders if exists
    setHoldOrders(prev => prev.filter(o => o.orderId !== currentOrder.orderId));

    setSelectedTableId(null);
  };

  const quickPrint = () => {
    if (!currentOrder) return;
    console.log("Printing order:", currentOrder);
  };

  return { holdOrder, completeOrder, cancelOrder, quickPrint };
};
