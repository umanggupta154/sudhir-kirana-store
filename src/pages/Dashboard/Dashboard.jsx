import PageHeader from "../../components/Common/PageHeader";
import StatCard from "../../components/Dashboard/StatCard";

function Dashboard() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        subtitle="Welcome to Sudhir Kirana Store Admin Panel"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value="0"
          color="#16A34A"
        />

        <StatCard
          title="Today's Orders"
          value="0"
          color="#2563EB"
        />

        <StatCard
          title="Today's Sales"
          value="₹0"
          color="#F97316"
        />

        <StatCard
          title="Out Of Stock"
          value="0"
          color="#DC2626"
        />
      </div>

      {/* 👇 YAHAN Recent Orders Add Karna Hai */}
      <div className="bg-white rounded-xl shadow-md mt-8 p-6">
        <h2 className="text-xl font-semibold mb-4">
          Recent Orders
        </h2>

        <p className="text-gray-500">
          No orders available.
        </p>
      </div>

      {/* 👇 Iske Bilkul Neeche Quick Actions Add Karna Hai */}
      <div className="bg-white rounded-xl shadow-md mt-6 p-6">
        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex gap-4">
          <button className="bg-green-700 text-white px-5 py-2 rounded-lg">
            + Add Product
          </button>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
            View Orders
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;