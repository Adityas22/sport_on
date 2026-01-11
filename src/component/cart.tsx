import { useState } from "react";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Data dummy sesuai gambar
  const cartItems = [
    {
      id: 1,
      name: "SportsOn HyperSoccer v2",
      price: 458000,
      qty: 2,
      img: "/images/products/product-4.png",
    },
    {
      id: 2,
      name: "SportsOn Slowlivin",
      price: 119000,
      qty: 1,
      img: "/images/products/product-5.png",
    },
  ];

  const total = 1035000;

  return (
    <div className="relative inline-block">
      {/* Tombol Keranjang */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative p-2 text-gray-700 hover:text-black transition-colors duration-300 focus:outline-none"
      >
        <span className="absolute inset-0 rounded-full bg-gray-200 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out -z-10"></span>
        <ShoppingBag size={22} strokeWidth={2} />
        <span className="absolute top-0 right-0 bg-[#FF5733] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
          3
        </span>
      </button>

      {/* Popup / Dropdown Cart */}
      {isOpen && (
        <>
          {/* Overlay untuk menutup saat klik di luar (optional) */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-20 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-gray-100 text-center">
              <h3 className="font-bold text-gray-800">Shopping Cart</h3>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors "
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-15 rounded object-contain mr-3 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-xl"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800 leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.qty}x{" "}
                      <span className="text-[#FF5733] font-bold">
                        Rp. {item.price.toLocaleString("id-ID")}
                      </span>
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-[#FF5733]">
                  Rp. {total.toLocaleString("id-ID")}
                </span>
              </div>
              <button className="w-full ">
                <Link
                  to="/checkout"
                  className="bg-[#1A1A1A] text-white py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-black transition-all"
                >
                  Checkout Now <ArrowRight size={18} />
                </Link>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
