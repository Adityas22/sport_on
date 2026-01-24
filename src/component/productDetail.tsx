import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

import { productService } from "../service/api/product.service";
import { Product } from "../service/types//product.types";
import { formatPrice } from "../service/utils/price.utils";
import { useCart } from "./cart";
import { BASE_URL } from "../service/api/client";

const ProductDetail = () => {
  const { addToCart, setBuyNowItems } = useCart();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  // Fungsi untuk increase/decrease quantity
  const increase = () => setQty((p) => p + 1);
  const decrease = () => setQty((p) => (p > 1 ? p - 1 : 1));

  // Handle Buy Now - langsung ke checkout dengan item ini saja
  const handleBuyNow = () => {
    if (!product) return;

    // Set item untuk buy now
    setBuyNowItems([{ product, qty }]);

    // Navigate ke checkout dengan state buy_now
    navigate("/checkout", { state: { mode: "buy_now" } });
  };

  // Ambil data produk berdasarkan ID
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        const data = await productService.getById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        // Redirect ke home jika produk tidak ditemukan
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // Tampilan loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat produk...</p>
        </div>
      </div>
    );
  }

  // Jika produk tidak ditemukan
  if (!product) {
    return null;
  }

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start md:p-5 lg:p-10 p-4">
        {/* LEFT IMAGE */}
        <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative w-full md:h-full overflow-x-hidden grid place-items-center rounded-xl p-8">
          <img
            // src={product.imageUrl}
            src={`${BASE_URL}/${product.imageUrl}`}
            alt={product.name}
            className="hidden sm:block object-contain max-h-96"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h1 className="text-4xl font-extrabold mb-2">{product.name}</h1>

          {/* CATEGORY TAG */}
          <span className="bg-pink-100 text-pink-700 text-sm px-3 py-1 rounded-full">
            {product.category.name}
          </span>

          {/* MOBILE IMAGE */}
          <div className="mt-6 flex justify-center sm:hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative w-full rounded-xl p-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-64 rotate-2 drop-shadow-2xl"
            />
          </div>

          {/* DESCRIPTION */}
          <p className="mt-4 text-gray-600 leading-relaxed text-justify">
            {product.description}
          </p>

          {/* STOCK INFO */}
          <p className="mt-2 text-sm text-gray-500">
            Stock: <span className="font-semibold">{product.stock} items</span>
          </p>

          {/* ACTION SECTION CONTAINER */}
          <div className="mt-8 flex flex-col gap-6">
            {/* HARGA */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Price</p>
              <p className="text-3xl md:text-4xl font-extrabold text-orange-500">
                {formatPrice(product.price * qty)}
              </p>
              {qty > 1 && (
                <p className="text-xs text-gray-400 mt-1">
                  {formatPrice(product.price)} × {qty}
                </p>
              )}
            </div>

            <div className="flex flex-row items-center gap-2 sm:gap-4 w-full">
              {/* QTY SELECTOR */}
              <div className="flex items-center border border-gray-200 rounded-lg h-14 bg-white overflow-hidden shadow-sm w-20 sm:w-28 flex-shrink-0">
                <div className="flex-1 flex items-center justify-center border-r border-gray-100 font-bold text-sm sm:text-base">
                  {qty}
                </div>
                <div className="flex flex-col w-8 sm:w-10 h-full bg-gray-50">
                  <button
                    onClick={increase}
                    disabled={qty >= product.stock}
                    className="flex-1 flex items-center justify-center hover:bg-gray-100 border-b border-gray-200 text-sm sm:text-base font-bold text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Tambah"
                  >
                    +
                  </button>
                  <button
                    onClick={decrease}
                    className="flex-1 flex items-center justify-center hover:bg-gray-100 text-sm sm:text-base font-bold text-gray-600"
                    title="Kurang"
                  >
                    −
                  </button>
                </div>
              </div>

              {/* WRAPPER TOMBOL */}
              <div className="flex flex-row gap-2 flex-1 min-w-0">
                {/* ADD TO CART */}
                <button
                  className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-orange-500 text-white h-14 rounded-lg hover:bg-orange-600 font-bold transition-all active:scale-95 shadow-md min-w-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={product.stock === 0}
                  onClick={() => addToCart(product, qty)}
                >
                  <ShoppingBag size={22} strokeWidth={2} />
                  <span className="whitespace-nowrap text-[10px] xs:text-xs sm:text-sm lg:text-base truncate">
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </span>
                </button>

                {/* BUY NOW - Langsung ke checkout */}
                <button
                  className="flex-1 bg-gray-900 text-white h-14 rounded-lg hover:bg-black font-bold transition-all active:scale-95 shadow-md whitespace-nowrap text-[10px] xs:text-xs sm:text-sm lg:text-base truncate disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={product.stock === 0}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
