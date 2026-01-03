import { useState } from "react";
import { useDashboard } from "./hooks/useDashboard";
import LeftSidebar from "./components/LeftSidebar";
import ProductGrid from "./components/ProductGrid";
import OrderTable from "./components/OrderTable";
import OrderInfo from "./components/OrderInfo";
import OrderInfoModal from "../../shared/OrderInfoModal";
import BillingSummary from "./components/BillingSummary";
import SearchCategory from "./components/SearchCategory";
import OrderActions from "./components/OrderActions";

export default function Dashboard() {
  const d = useDashboard();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="max-w-[1400px] mx-auto mt-8 border h-[90%] bg-white">
     <div className="px-5 py-3 font-semibold text-gray-900 border-b">Sales Bill</div>
    <div className="flex p-4 bg-white">

  {/* LEFT */}
      <aside className="w-56">
       <LeftSidebar
          tables={d.tables}
          orders={d.orders}
          holdOrders={d.holdOrders}
          selectedTableId={d.currentOrder?.tableId ?? null}
          onSelect={d.selectTable}
          onResume={d.resumeHoldOrder}
        />
      </aside>

  {/* CENTER */}
   <main className="flex-1 px-4">
  
      {/* Order Info ALWAYS */}
      <OrderInfo
        info={d.currentOrder?.info}
        disabled={!d.currentOrder}
        onAdd={() => {
          if (!d.currentOrder) return;
          setShowInfo(true);
        }}
      />

  {/* Order Table ALWAYS */}
      <OrderTable
        items={d.currentOrder?.items ?? []}
        showHeader={!!d.currentOrder}
        onRemove={d.removeProduct}
        tableLabel={d.tables.find(t => t.id === d.currentOrder?.tableId)?.name}
      />

  {/* Action Buttons ALWAYS */}
      <div className="flex justify-between items-start mt-4">

          <OrderActions
              hasOrder={Boolean(d.currentOrder)}
              hasItems={Boolean(d.currentOrder?.items.length)}
              onComplete={d.completeOrder}
              onQuickPrint={d.quickPrint}
              onHold={d.holdOrder}
              onCancel={d.cancelOrder}
            />
  {/* Billing Summary ONLY when items */}
            {d.currentOrder && d.currentOrder.items.length > 0 && (
              <BillingSummary items={d.currentOrder.items} />
            )}
      </div>
</main>



      {/* RIGHT */}
      <aside className="w-80">
        <SearchCategory
          categories={d.categories}
          selectedCategory={d.selectedCategory}
          onSelect={d.setSelectedCategory}
          search={d.search}
          onSearch={d.setSearch}
        />
        <ProductGrid products={d.products} onAdd={d.addProduct} />
      </aside>

      {showInfo && d.currentOrder && (
        <OrderInfoModal
          onClose={() => setShowInfo(false)}
          onSave={d.updateOrderInfo}
        />
      )}
    </div>
    </div>
  );
}
