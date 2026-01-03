import { useRef } from "react";
import type { Category } from "../../../api/types";

type Props = {
  categories: Category[];
  selectedCategory: number | null;
  onSelect: (id: number | null) => void;
  search: string;
  onSearch: (v: string) => void;
};

export default function SearchCategory({
  categories,
  selectedCategory,
  onSelect,
  search,
  onSearch,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -150 : 150,
      behavior: "smooth",
    });
  };

  return (
    <div className="space-y-2">
      {/* Search */}
      <input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search product or scan barcode"
        className="w-full border rounded px-3 py-2 bg-white"
      />

      {/* Categories with arrows */}
      <div className="flex items-center gap-2">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="px-2 py-1 border rounded bg-[#22a4e4] text-white"
        >
          ◀
        </button>

        {/* Scrollable Categories */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto no-scrollbar flex-1"
        >
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`px-3 py-1 rounded whitespace-nowrap text-white ${
                selectedCategory === c.id
                  ? "bg-green-500 text-white"
                  : "border bg-[#22a4e4]"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="px-2 py-1 border rounded bg-[#22a4e4] text-white"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
