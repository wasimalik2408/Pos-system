import type { Product } from "../../../api/types";

type Props = {
  products: Product[];
  onAdd: (p: Product) => void;
};

export default function ProductGrid({ products, onAdd }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 max-h-[calc(100vh-360px)] overflow-y-auto no-scrollbar mt-2">
      {products.map((p) => (
        <button
          key={p.id}
          onClick={() => onAdd(p)}
          className="
            border border-gray-300 rounded
            bg-white hover:bg-gray-50
            p-2 text-left
            transition
          "
        >
          {/* IMAGE PLACEHOLDER (same layout as POS image cards) */}
          <div className="h-20 bg-gray-100 rounded flex items-center justify-center mb-2 text-xs text-gray-400">
            <img src={p.image} alt={p.name} className="max-h-full max-w-full" />
          </div>

          {/* NAME */}
          <div className="text-sm font-medium text-gray-800 truncate">
            {p.name}
          </div>

          {/* PRICE */}
          <div className="text-xs text-gray-600 mt-1">
            ₹{p.price}
          </div>
        </button>
      ))}
    </div>
  );
}
