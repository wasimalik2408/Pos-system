type Props = {
  hasOrder: boolean;
  hasItems: boolean;
  onComplete: () => void;
  onQuickPrint: () => void;
  onHold: () => void;
  onCancel: () => void;
};

export default function OrderActions({
  hasOrder,
  hasItems,
  onComplete,
  onQuickPrint,
  onHold,
  onCancel
}: Props) {
  return (
    <div className="flex flex-col gap-2 w-64">
      <button
        onClick={onComplete}
        disabled={!hasOrder || !hasItems}
        className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white py-2 rounded font-medium"
      >
        Complete Order
      </button>

      <button
        onClick={onQuickPrint}
        disabled={!hasOrder}
        className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white py-2 rounded font-medium"
      >
        Quick Print
      </button>

      <button
        onClick={onHold}
        disabled={!hasOrder || !hasItems}
        className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-2 rounded font-medium"
      >
        Hold Order
      </button>

      <button
        onClick={onCancel}
        disabled={!hasOrder}
        className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-2 rounded font-medium"
      >
        Cancel Order
      </button>
    </div>
  );
}
