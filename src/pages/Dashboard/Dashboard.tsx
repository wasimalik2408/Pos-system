import { useState } from "react";
import { useDashboard } from "./hooks/useDashboard";
import LeftSidebar from "./components/LeftSidebar";
import OrderTable from "./components/OrderTable";
import OrderInfo from "./components/OrderInfo";
import BillingSummary from "./components/BillingSummary";
import OrderInfoModal from "../../shared/components/OrderInfoModal";
import OrderActions from "../../shared/components/OrderActions";
import SearchCategory from "../../shared/components/ProductSearchBar";
import ProductGrid from "../../shared/components/ProductGrid";

export default function Dashboard() {
  const d = useDashboard();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="max-w-[1400px] mx-auto mt-8 border h-[90%] bg-white">
     <div className="px-5 py-3 font-semibold text-gray-900 border-b">Sales Bill 
      <span className="text-sm font-light float-right text-gray-500">Barcode product instantly. 890100000009, 890100000010, 890100000012</span>
     </div>
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
        disabled={!d.currentOrder}  // ✅ disable + if no table selected
        onAdd={() => setShowInfo(true)}
      />

  {/* Order Table ALWAYS */}
 <OrderTable
      items={d.currentOrder?.items ?? []}
      showHeader={!!d.currentOrder}
      onRemove={d.removeProduct}
      tableLabel={
        d.tables.find(t => t.id === d.selectedTableId)?.name
      }
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
          search={d.search}
          onSearch={d.setSearch}
          selectedCategory={d.categoryId}
          onSelect={d.setCategoryId}
        />
        <ProductGrid products={d.products} onAdd={d.addProduct} />
      </aside>

      {showInfo && d.currentOrder && (
     <OrderInfoModal
        info={d.currentOrder?.info}   // prefill
        onClose={() => setShowInfo(false)} // close modal
        onSave={d.updateOrderInfo}    // save info to current order
      />
      )}
    </div>
    </div>
  );
}
