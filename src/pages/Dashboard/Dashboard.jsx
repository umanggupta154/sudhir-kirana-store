import PageHeader from "../../components/Common/PageHeader";
import StatCard from "../../components/Dashboard/StatCard";
import Button from "../../components/Common/Button";

function Dashboard() {
  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        subtitle="Welcome to Sudhir Kirana Store Admin Panel"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <Button
            text="+ Add Product"
            to="/add-product"
            color="green"
          />

          <Button
            text="View Orders"
            to="/orders"
            color="blue"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;