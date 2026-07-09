import StatCard from "../../components/Dashboard/StatCard";

function Dashboard() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

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
    </>
  );
}

export default Dashboard;