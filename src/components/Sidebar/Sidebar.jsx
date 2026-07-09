function Sidebar() {
  return (
    <div className="w-64 h-screen bg-green-700 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">
        Sudhir Kirana Store
      </h1>

      <ul className="space-y-4">
        <li>🏠 Dashboard</li>
        <li>📦 Products</li>
        <li>🛒 Orders</li>
        <li>👥 Customers</li>
        <li>⚙ Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;