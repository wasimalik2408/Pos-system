import type { OrderItem } from "../../../api/types";

type Props = {
  items: OrderItem[];
  onRemove: (id: number) => void;
  showHeader?: boolean;
  tableLabel?: string;
};

export default function OrderTable({
  items,
  onRemove,
  showHeader = false,
  tableLabel
}: Props) {
  return (
    <div className="flex flex-col border border-gray-200 rounded bg-white">
       {/* TABLE / WALK-IN NAME */}
      <div className="px-3 py-2 border-b bg-gray-50">
        <span className="text-sm font-semibold text-gray-700">
          {tableLabel ?? "No active order"}
        </span>
      </div>
      {/* HEADER */}
      {showHeader && (
        <div className="grid grid-cols-6 gap-2 text-xs font-semibold text-gray-600 bg-gray-100 border-b px-2 py-2">
          <div className="col-span-2">ITEM</div>
          <div className="text-left">TYPE</div>
          <div className="text-left">PRICE</div>
          <div className="text-left">QTY</div>
          <div className="text-left">TOTAL</div>
        </div>
      )}

      {/* ITEMS */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar bg-white min-h-[calc(100vh-652px)] max-h-[calc(100vh-652px)]">
        {items.length === 0 ? (
          <div className="flex items-center justify-center text-gray-400 text-sm">
            No items added
          </div>
        ) : (
          items.map((i) => (
            <div
              key={i.productId}
              className="grid grid-cols-6 gap-2 items-center border border-gray-200 rounded px-2 py-3 text-sm bg-gray-50"
            >
              {/* ITEM */}
              <div className="col-span-2 font-medium text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                {i.name}
              </div>

              {/* TYPE */}
              <div className="text-left text-gray-600">
                {i.custDeiscription}
              </div>

              {/* PRICE */}
              <div className="text-left text-gray-700">
                ₹{i.price}
              </div>

              {/* QTY */}
              <div className="text-left  text-gray-700">
                {i.qty}
              </div>

              {/* TOTAL + REMOVE */}
              <div className="flex items-left justify-between gap-2">
                <span className="font-semibold text-gray-800">
                  ₹{i.price * i.qty}
                </span>

                <button
                  onClick={() => onRemove(i.productId)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-0.5 text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
