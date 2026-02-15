import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const AdminLayout = () => (
  <div className="flex bg-gray-50 min-h-screen">
    <Sidebar />
    <main className="flex-1 ml-64 p-8">
      <Outlet />
    </main>
  </div>
);
export default AdminLayout;
