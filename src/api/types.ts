export type TableStatus = "free" | "booked";
export type OrderState = "active" | "hold" | "completed" | "cancelled";
export type TableType = "walk-in" | "table";

export type Table = {
  id: number;
  name: string;
  status: TableStatus;
  type: TableType;
};

export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  image?: string;
  barcode?: string;
  custDeiscription: string;
};

export type OrderItem = {
  productId: number;
  name: string;
  price: number;
  qty: number;
  custDeiscription: string
};

export type OrderInfo = {
  orderType: "dine-in" | "walk-in";
  customerName: string;
  phone?: string;
  paymentType?: "Cash" | "Card" | "Upi";
};

export type TableOrder = {
  tableId: number;
  status: TableStatus; // free / booked
  items: OrderItem[];
  info: OrderInfo;
  orderState: OrderState; // <-- make sure this exists
  orderId: string; // ✅
  kotId: string;   // ✅
};

export type BillingData = {
  subTotal: number;
  discount: number;
  serviceCharge: number;
  total: number;
};