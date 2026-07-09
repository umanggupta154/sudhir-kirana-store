import { Bell, Search, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <div className="h-16 bg-white shadow flex justify-between items-center px-6">

      <div className="flex items-center gap-3">

        <Search size={20} />

        <input
          type="text"
          placeholder="Search..."
          className="outline-none"
        />

      </div>

      <div className="flex items-center gap-5">

        <Bell size={22} />

        <div className="flex items-center gap-2">

          <UserCircle size={32} />

          <span>Umang</span>

        </div>

      </div>

    </div>
  );
}

export default Navbar;