import { Outlet } from "react-router-dom";
import Header from "./header"; // ✅ Header component

export default function AppLayout() {
  return (
    <div className="h-screen flex flex-col bg-[#f9f6f1]">
      {/* Header */}
      <Header />
      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}