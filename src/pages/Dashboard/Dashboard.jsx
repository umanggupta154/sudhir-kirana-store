import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PageHeader from "../../components/Common/PageHeader";
import StatCard from "../../components/Dashboard/StatCard";

import { getDashboardStats } from "../../services/productService";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    outOfStock: 0,
    totalStock: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const data = await getDashboardStats();
    setStats(data);
  }

  return (
    <div>
      {/* Header */}

      <PageHeader
        title="Dashboard"
        subtitle="Welcome to Sudhir Kirana Store Admin Panel"
      />

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          color="#16A34A"
        />

        <StatCard
          title="Today's Orders"
          value="0"
          color="#2563EB"
        />

        <StatCard
          title="Total Stock"
          value={stats.totalStock}
          color="#F97316"
        />

        <StatCard
          title="Out Of Stock"
          value={stats.outOfStock}
          color="#DC2626"
        />

      </div>

      {/* Recent Orders */}

      <div className="bg-white rounded-xl shadow-md mt-8 p-6">

        <h2 className="text-xl font-semibold mb-4">
          Recent Orders
        </h2>

        <p className="text-gray-500">
          No orders available.
        </p>

      </div>

      {/* Quick Actions */}

      <div className="bg-white rounded-xl shadow-md mt-6 p-6">

        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <Link
            to="/add-product"
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg transition"
          >
            + Add Product
          </Link>

          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            View Products
          </Link>

          <Link
            to="/orders"
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition"
          >
            View Orders
          </Link>

        </div>

      </div>

      {/* Inventory Summary */}

      <div className="bg-white rounded-xl shadow-md mt-6 p-6">

        <h2 className="text-xl font-semibold mb-4">
          Inventory Summary
        </h2>

        <div className="space-y-3">

          <div className="flex justify-between border-b pb-2">
            <span>Total Products</span>
            <span className="font-semibold">
              {stats.totalProducts}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>Total Stock</span>
            <span className="font-semibold">
              {stats.totalStock}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Out Of Stock</span>
            <span className="font-semibold text-red-600">
              {stats.outOfStock}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;