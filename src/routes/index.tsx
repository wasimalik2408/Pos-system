// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import AppLayout from "../layouts/AppLayout";
import { ROUTES } from "./path";

// Lazy pages
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Billing = lazy(() => import("../pages/Billing/Billing"));
const Master = lazy(() => import("../pages/Master/Master"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.BILLING} element={<Billing />} />
        <Route path={ROUTES.MASTER} element={<Master />} />
      </Route>
    </Routes>
  );
}
