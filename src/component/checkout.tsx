import { Trash2, CreditCard } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./cart";
import { formatPrice } from "../service/utils/price.utils";
import { useState } from "react";
import { BASE_URL } from "../service/api/client";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, buyNowItems, removeFromCart } = useCart();

  // State untuk form
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");

  // Cek mode: buy_now atau cart
  const mode = location.state?.mode || "cart";

  // Tentukan items yang akan di-checkout
  const checkoutItems = mode === "buy_now" ? buyNowItems : cartItems;

  // Menghitung total harga
  const totalPrice = checkoutItems.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0,
  );

  // Handle proceed to payment
  const handleProceedToPayment = () => {
    // Validasi form
    if (!fullName || !whatsapp || !address) {
      alert("Please fill in all fields!");
      return;
    }

    // Navigate dengan data
    navigate("/payment", {
      state: {
        mode,
        checkoutData: {
          fullName,
          whatsapp,
          address,
        },
      },
    });
  };

  return (
    <section className="w-full bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-black text-center mb-10">Checkout Now</h1>

        {/* Info mode untuk debugging - bisa dihapus */}
        {mode === "buy_now" && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-md mb-4 text-center text-sm">
            Buy Now Mode - Checkout item terpilih
          </div>
        )}

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
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 bg-gray-100 border-none rounded-md focus:ring-2 focus:ring-purple-200 outline-none resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* RIGHT: CART ITEMS */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {mode === "buy_now" ? "Item to Checkout" : "Cart Items"}
              </h2>

              {checkoutItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No items to checkout
                </p>
              ) : (
                <div className="space-y-0 divide-y divide-gray-100">
                  {checkoutItems.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex items-center py-4 first:pt-0"
                    >
                      {/* Gambar dengan object-contain agar tidak terpotong */}
                      <div className="w-25 h-16 rounded-md bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={`${BASE_URL}/${item.product.imageUrl}`}
                          alt={item.product.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>

                      <div className="ml-4 flex-grow">
                        <h3 className="font-bold text-gray-800 text-sm md:text-base">
                          {item.product.name}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500">
                          {item.qty}x{" "}
                          <span className="text-orange-500 font-semibold">
                            {formatPrice(item.product.price)}
                          </span>
                        </p>
                      </div>

                      {/* Hanya tampilkan tombol delete jika mode cart */}
                      {mode === "cart" && (
                        <button
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          onClick={() => removeFromCart(item.product._id)}
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TOTAL & BUTTON - Always at the bottom */}
            <div className="mt-auto border-t border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg text-gray-800">Total</span>
                <span className="font-bold text-lg text-orange-500">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <button
                onClick={handleProceedToPayment}
                className="block w-full bg-[#1A1A1A] text-white py-4 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-black transition-all"
              >
                Proceed to Payment <CreditCard size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
