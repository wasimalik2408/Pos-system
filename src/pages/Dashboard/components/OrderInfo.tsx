import type { OrderInfo } from "../../../api/types";

type Props = {
  info?: OrderInfo;
  onAdd: () => void;
  disabled?: boolean;
};

export default function OrderInfo({ info, onAdd, disabled }: Props) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <input
        readOnly
        value={info?.customerName || "Customer"}
        className="border rounded px-3 py-2 flex-1 bg-white"
      />

      <select disabled className="border rounded px-3 py-2 bg-white">
        <option>{info?.paymentType ?? "Cash"}</option>
      </select>

      <button
        onClick={onAdd}
        disabled={disabled}
        className={`px-4 py-2 rounded font-bold text-white bg-green-600 ${
          disabled
            ? "cursor-not-allowed"
            : ""
        }`}
      >
        +
      </button>

      <select disabled className="border rounded px-3 py-2 bg-white">
        <option>
          {info?.orderType === "walk-in" ? "Walk In" : "Dine In"}
        </option>
      </select>
    </div>
  );
}
