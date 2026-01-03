import type { OrderItem } from "../../../api/types";

type Props = {
  items: OrderItem[];
  discount?: number; // in percentage
  serviceCharge?: number; // fixed value
};

export default function BillingSummary({
  items,
  discount = 10,
  serviceCharge = 10,
}: Props) {
  const subTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalDiscount = (subTotal * discount) / 100;
  const gst = ((subTotal - totalDiscount) * 0.12); // 12% GST
  const totalAmount = subTotal - totalDiscount + gst + serviceCharge;

  return (
    <div className="border rounded p-4 flex flex-col gap-2 w-full max-w-md">
      <div className="flex justify-between">
        <span>Sub Total</span>
        <span>₹{subTotal}</span>
      </div>

      <div className="flex justify-between">
        <span>Discount (%)</span>
        <span>{discount}%</span>
      </div>

      <div className="flex justify-between">
        <span>Total Discount</span>
        <span>₹{totalDiscount.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <span>GST/VAT @ 12%</span>
        <span>₹{gst.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <span>Service/Delivery Charge</span>
        <span>₹{serviceCharge}</span>
      </div>

      <div className="border-t mt-2 pt-2 flex justify-between font-bold text-lg">
        <span>Total Amount</span>
        <span>₹{totalAmount.toFixed(2)}</span>
      </div>

      {/* <button className="mt-3 bg-green-600 text-white px-6 py-2 rounded w-full">
        Pay Now
      </button> */}
    </div>
  );
}
