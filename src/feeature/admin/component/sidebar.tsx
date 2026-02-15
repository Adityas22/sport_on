import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Layers, ShoppingCart, CreditCard, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import authService from "../../../service/api/auth.service";

const Sidebar: React.FC = () => {
  const location = useLocation();

  // Helper untuk menentukan apakah link sedang aktif
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { name: "Products", path: "/admin/products", icon: <Box size={20} /> },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <Layers size={20} />,
    },
    {
      name: "Transactions",
      path: "/admin/transactions",
      icon: <ShoppingCart size={20} />,
    },
    {
      name: "Bank Informations",
      path: "/admin/bank",
      icon: <CreditCard size={20} />,
    },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    // Konfirmasi logout (opsional)
    if (window.confirm("Are you sure you want to logout?")) {
      authService.logout();
      navigate("/admin/login"); // Redirect ke halaman login
    }
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      {/* LOGO SECTION */}
      <div className="px-6 py-10 mb-4 flex justify-center">
        {/* Berikan batas lebar maksimal yang besar */}
        <div className="w-full max-w-[180px]">
          <img
            src="/images/logo-admin.svg"
            alt="Logo"
            className="w-full h-auto object-contain block" // w-full akan memaksa gambar membesar
          />
        </div>
      </div>
      {/* NAVIGATION LINKS */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive(item.path)
                ? "bg-red-50 text-[#FF5733] font-semibold"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>
      {/* Button logout */}
      <div className="p-6 border-t border-gray-50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-2 w-full text-gray-500 hover:text-red-600 transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
