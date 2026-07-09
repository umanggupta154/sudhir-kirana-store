import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  PlusCircle,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/",
    },
    {
      name: "Products",
      icon: <Package size={20} />,
      path: "/products",
    },
    {
      name: "Add Product",
      icon: <PlusCircle size={20} />,
      path: "/add-product",
    },
    {
      name: "Orders",
      icon: <ShoppingCart size={20} />,
      path: "/orders",
    },
    {
      name: "Customers",
      icon: <Users size={20} />,
      path: "/customers",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-green-700 text-white">

      <div className="p-6 border-b border-green-600">

        <h1 className="text-2xl font-bold">
          Sudhir Kirana Store
        </h1>

        <p className="text-sm mt-2 text-green-100">
          Admin Panel
        </p>

      </div>

      <div className="p-4 space-y-2">

        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-white text-green-700 font-semibold"
                  : "hover:bg-green-600"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}

      </div>
    </div>
  );
}

export default Sidebar;