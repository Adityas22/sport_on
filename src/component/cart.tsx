import { createContext, useContext, useState, ReactNode } from "react";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CartItem } from "../service/types/cart.types";
import { Product } from "../service/types/product.types";
import { formatPrice } from "../service/utils/price.utils";
import { BASE_URL } from "../service/api/client";

/* ======================
   CONTEXT
====================== */

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  total: number;
  buyNowItems: CartItem[]; // Item untuk buy now
  setBuyNowItems: (items: CartItem[]) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [buyNowItems, setBuyNowItems] = useState<CartItem[]>([]);

  console.log("🛒 CartProvider render");
  console.log("🛒 cartItems:", cartItems);
  console.log("🛒 buyNowItems:", buyNowItems);

  const addToCart = (product: Product, qty: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);

      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, qty: item.qty + qty }
            : item,
        );
      }

      return [...prev, { product, qty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product._id !== productId),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        total,
        buyNowItems,
        setBuyNowItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};

/* ======================
   UI CART COMPONENT
====================== */

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, removeFromCart, total } = useCart();

  const totalQty = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="relative inline-block">
      {/* Tombol Keranjang */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative p-2 text-gray-700 hover:text-black transition-colors duration-300 focus:outline-none"
      >
        <span className="absolute inset-0 rounded-full bg-gray-200 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out -z-10"></span>
        <ShoppingBag size={22} strokeWidth={2} />

        {totalQty > 0 && (
          <span className="absolute top-0 right-0 bg-[#FF5733] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
            {totalQty}
          </span>
        )}
      </button>

      {/* Popup / Dropdown Cart */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-20 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-gray-100 text-center">
              <h3 className="font-bold text-gray-800">Shopping Cart</h3>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {cartItems.length === 0 && (
                <p className="p-4 text-center text-gray-500">Cart kosong</p>
              )}

              {cartItems.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={`${BASE_URL}/${item.product.imageUrl}`}
                    className="w-20 h-15 object-contain mr-3 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-xl"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800 leading-tight">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.qty}x{" "}
                      <span className="text-[#FF5733] font-bold">
                        {formatPrice(item.product.price)}
                      </span>
                    </p>
                  </div>
                  <button
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-[#FF5733]">
                  {formatPrice(total)}
                </span>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-[#1A1A1A] text-white py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-black transition-all"
              >
                Checkout Now <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
