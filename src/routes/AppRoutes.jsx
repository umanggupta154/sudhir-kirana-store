import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Products from "../pages/Products/Products";
import AddProduct from "../pages/AddProduct/AddProduct";
import Orders from "../pages/Orders/Orders";
import Customers from "../pages/Customers/Customers";
import Settings from "../pages/Settings/Settings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AdminLayout />}>

          <Route path="/" element={<Dashboard />} />

          <Route path="/products" element={<Products />} />

          <Route path="/add-product" element={<AddProduct />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/customers" element={<Customers />} />

          <Route path="/settings" element={<Settings />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;