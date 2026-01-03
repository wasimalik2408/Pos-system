import { NavLink } from "react-router-dom";
import { ROUTES } from "../routes/path";
import {
  LayoutDashboard,
  Settings,
  Receipt,
  BarChart3
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: "Master", path: ROUTES.MASTER, icon: Settings },
  { name: "Billing", path: ROUTES.BILLING, icon: Receipt },
  { name: "Report", path: ROUTES.REPORTS, icon: BarChart3 },
];

export default function Header() {
  return (
    <header className="bg-white border-b px-6">
      <div className="container max-w-[1400px] mx-auto">
 <nav className="flex gap-10 items-center">
        {navItems.map(item => {
          const Icon = item.icon;

          return (
            <NavLink key={item.name} to={item.path}>
              {({ isActive }) => (
                <div
                  className="flex flex-col items-center gap-1 transition-colors pt-4"
                >
                  <Icon className="text-gray-600" size={18} />
                  <span className={`text-md block p-3 pt-0 ${
                    isActive
                      ? "border-b-2 border-red-500 text-black"
                      : "text-gray-500 hover:text-gray-900"
                  }`}>
                    {item.name}
                  </span>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>
        </div>
    </header>
  );
}
