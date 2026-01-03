import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "./layouts/AppLayout";

// ✅ Lazy load all pages
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
// const Billing = lazy(() => import("./pages/Billing/Billing")); // if exists
// const Reports = lazy(() => import("./pages/Reports/Reports")); // if exists
// const Master = lazy(() => import("./pages/Master/Master"));   // if exists

export default function App() {
  return (
    <BrowserRouter>
      {/* Suspense fallback while page loads */}
      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/billing" element={<Billing />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/master" element={<Master />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}