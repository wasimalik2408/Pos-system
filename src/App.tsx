import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import AppRoutes from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
