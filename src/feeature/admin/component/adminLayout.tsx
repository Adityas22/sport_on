import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar"; // Sidebar yang kita buat tadi

const AdminLayout = () => (
  <div className="flex bg-gray-50 min-h-screen">
    <Sidebar />
    <main className="flex-1 ml-64 p-8">
      <Outlet /> {/* Ini tempat halaman admin muncul */}
    </main>
  </div>
);
export default AdminLayout;
