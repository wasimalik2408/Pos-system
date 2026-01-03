import { useState } from "react";
import type { OrderInfo } from "../../api/types";

type Props = {
  onClose: () => void;
  onSave: (info: OrderInfo) => void;
};

export default function OrderInfoModal({ onClose, onSave }: Props) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState<"dine-in" | "walk-in">("dine-in");
  const [paymentType, setPaymentType] = useState<"Cash" | "Card" | "Upi">("Cash");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-96">
        <h3 className="font-bold mb-4">Billing Information</h3>

        {/* Customer Name */}
        <input
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
          placeholder="Customer Name"
          className="border w-full px-3 py-2 mb-3 bg-white"
        />

        {/* Phone Number */}
        <input
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="border w-full px-3 py-2 mb-3 bg-white"
        />

        {/* Order Type */}
        <select
          value={orderType}
          onChange={e => setOrderType(e.target.value as any)}
          className="border w-full px-3 py-2 mb-3 bg-white"
        >
          <option value="dine-in">Dine In</option>
          <option value="walk-in">Walk In</option>
        </select>

        {/* Payment Type */}
        <select
          value={paymentType}
          onChange={e => setPaymentType(e.target.value as any)}
          className="border w-full px-3 py-2 mb-4 bg-white"
        >
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="upi">UPI</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({
                customerName,
                phone,
                orderType,
                paymentType
              });
              onClose();
            }}
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
