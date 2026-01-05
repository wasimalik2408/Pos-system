import { useState } from "react";
import type { OrderInfo } from "../../api/types";

type Props = {
  onClose: () => void;
  onSave: (info: OrderInfo) => void;
  info?: OrderInfo;
};

export default function OrderInfoModal({ onClose, onSave, info }: Props) {
  const [phone, setPhone] = useState(info?.phone ?? "");
  const [customerName, setCustomerName] = useState(info?.customerName ?? "");
  const [orderType, setOrderType] = useState<OrderInfo["orderType"]>(
    info?.orderType ?? "dine-in"
  );
  const [paymentType, setPaymentType] = useState<OrderInfo["paymentType"]>(
    info?.paymentType ?? "Cash"
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-96">
        <h3 className="font-bold mb-4">Billing Information</h3>
        {/* Name */}
        <input
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
          placeholder="Customer Name"
          className="border w-full px-3 py-2 mb-3 bg-white"
        />

        {/* Phone */}
        <input
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="border w-full px-3 py-2 mb-3 bg-white"
        />

        {/* Order Type */}
        <select
          value={orderType}
          onChange={e => setOrderType(e.target.value as OrderInfo["orderType"])}
          className="border w-full px-3 py-2 mb-3 bg-white"
        >
          <option value="dine-in">Dine In</option>
          <option value="walk-in">Walk In</option>
        </select>

        {/* Payment */}
        <select
          value={paymentType}
          onChange={e => setPaymentType(e.target.value as OrderInfo["paymentType"])}
          className="border w-full px-3 py-2 mb-4 bg-white"
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Upi">UPI</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({
                phone,
                customerName,
                orderType,
                paymentType,
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
