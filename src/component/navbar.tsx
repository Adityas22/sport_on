import React, { useState } from "react";
import {
  Search,
  // ShoppingBag,
  Menu,
  X,
} from "lucide-react";
import Cart from "./cart";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  // const [open] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200">
      <nav className="w-full max-w-screen-2xl mx-auto px-10 lg:px-10 md:px-6 px-4 py-4 flex items-center justify-between">
        {/* LEFT: Logo */}
        <div className="flex items-center">
          <img
            src="/images/logo.svg"
            alt="Logo Perusahaan"
            className="w-24 sm:w-32 md:w-40 lg:w-48 h-auto object-contain"
          />
        </div>

        {/* CENTER: Desktop Menu */}
        <ul className="hidden md:flex items-center gap-12 text-sm font-semibold text-gray-800">
          <li className="relative cursor-pointer group">
            Home
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-[#FF5733] rounded-full"></span>
          </li>
          <li className="cursor-pointer hover:text-[#FF5733] transition-colors">
            Category
          </li>
          <li className="cursor-pointer hover:text-[#FF5733] transition-colors">
            Explore Products
          </li>
        </ul>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-5">
          <button className="group relative p-2 text-gray-700 hover:text-black transition-colors duration-300">
            {/* Elemen Gelombang */}
            <span className="absolute inset-0 rounded-full bg-gray-200 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out -z-10"></span>
            <Search size={22} strokeWidth={2} />
          </button>
          <button className="group relative p-2 text-gray-700 hover:text-black transition-colors duration-300">
            <span className="absolute inset-0 rounded-full bg-gray-200 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out -z-10"></span>
            {/* <ShoppingBag size={22} strokeWidth={2} /> */}
            <Cart />
            {/* <span className="absolute top-0 right-0 bg-[#FF5733] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
              3
            </span> */}
          </button>
          <button
            className="group relative p-2 text-gray-800 md:hidden"
            onClick={() => setOpen(!open)}
          >
            <span className="absolute inset-0 rounded-full bg-gray-100 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out -z-10"></span>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
          <div className="cursor-pointer">Home</div>
          <div className="cursor-pointer">Category</div>
          <div className="cursor-pointer">Explore Products</div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
