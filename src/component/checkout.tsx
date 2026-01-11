import { Trash2, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Checkout = () => {
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

  // Menghitung total harga
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <section className="w-full bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-black text-center mb-10">Checkout Now</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* LEFT: ORDER INFORMATION */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Order Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Type your full name"
                  className="w-full p-3 bg-gray-100 border-none rounded-md focus:ring-2 focus:ring-purple-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Whatsapp Number
                </label>
                <input
                  type="text"
                  placeholder="+62xxxx"
                  className="w-full p-3 bg-gray-100 border-none rounded-md focus:ring-2 focus:ring-purple-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Shipping Address
                </label>
                <textarea
                  rows={5}
                  placeholder="Example Street, 18, West Jakarta, Indonesia, 66521"
                  className="w-full p-3 bg-gray-100 border-none rounded-md focus:ring-2 focus:ring-purple-200 outline-none resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* RIGHT: CART ITEMS */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Cart Items</h2>

              <div className="space-y-0 divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center py-4 first:pt-0"
                  >
                    {/* Gambar dengan object-contain agar tidak terpotong */}
                    <div className="w-25 h-16 rounded-md bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>

                    <div className="ml-4 flex-grow">
                      <h3 className="font-bold text-gray-800 text-sm md:text-base">
                        {item.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500">
                        {item.qty}x{" "}
                        <span className="text-orange-500 font-semibold">
                          Rp. {item.price.toLocaleString("id-ID")}
                        </span>
                      </p>
                    </div>

                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* TOTAL & BUTTON - Always at the bottom */}
            <div className="mt-auto border-t border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg text-gray-800">Total</span>
                <span className="font-bold text-lg text-orange-500">
                  Rp. {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
              <button className="w-full bg-[#1A1A1A] text-white py-4 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
                <Link
                  to="/payment"
                  className="bg-[#1A1A1A] text-white py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-black transition-all"
                >
                  Proceed to Payment <CreditCard size={20} />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
