import type { Table, TableOrder } from "../../../api/types";

type Props = {
  tables: Table[];
  orders: Record<number, TableOrder>;
  holdOrders: TableOrder[];
  selectedTableId: number | null;
  onSelect: (table: Table) => void;
  onResume: (order: TableOrder) => void;
};

export default function LeftSidebar({
  tables,
  orders,
  holdOrders,
  selectedTableId,
  onSelect,
  onResume,
}: Props) {
  return (
    <div className="bg-white flex flex-col">
      {/* TABLE / WALK-IN LIST */}
      <div className="flex-1 overflow-y-auto  space-y-1">
        {tables.map((t) => {
          const order = orders[t.id];
          const isBooked = order?.status === "booked";
          const isSelected = selectedTableId === t.id;

          return (
            <button
              key={t.id}
              onClick={() => onSelect(t)}
              className={`w-full flex items-center justify-between p-3 rounded-none border text-sm
                ${
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }
              `}
            >
              {/* NAME */}
              <span className="font-medium text-gray-700">
                {t.name}
              </span>

              {/* STATUS BADGE */}
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold
                  ${
                    isBooked
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }
                `}
              >
                {isBooked ? "Booked" : "Free"}
              </span>
            </button>
          );
        })}
      </div>

      {/* HOLD ORDERS */}
    {holdOrders.length > 0 && (
  <div className="mt-4">
    {/* Title */}
    <h4 className="font-semibold text-gray-900 mb-2">
      Hold Orders
    </h4>

    {/* List */}
    <div className="space-y-1">
      {holdOrders.map((o) => (
        <button
          key={o.orderId}
          onClick={() => onResume(o)}
          className="
            w-full flex items-center justify-between
            border border-gray-200
            bg-white hover:bg-gray-100
            rounded p-3
            text-xs transition
          "
        >
          {/* Order Id (left) */}
          <span className="font-semibold text-sky-600">
            #{o.orderId}
          </span>

          {/* Customer name (middle) */}
          <span className="flex-1 text-center text-gray-600 truncate px-2">
            {o.info.customerName}
          </span>

          {/* Status badge (right) */}
          <span className="bg-yellow-400 text-white text-[10px] px-2 py-0.5 rounded">
            HOLD
          </span>
        </button>
      ))}
    </div>
  </div>
)}

    </div>
  );
}
